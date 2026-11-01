import json
import os

from dotenv import load_dotenv
from groq import AsyncGroq
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from app.menu_data import get_menu_catalog, validate_recommendation
from app.prompts import SYSTEM_PROMPT, PROMPT_A, PROMPT_B

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY belum ditemukan di file .env")

client = AsyncGroq(api_key=GROQ_API_KEY)


app = FastAPI(
    title="Dapoyumya Menu Recommendation Assistant",
    
    description="API rekomendasi kombinasi menu Dapoyumya berdasarkan kebutuhan pelanggan.",
    version="1.0.0"
)

@app.get("/")
async def root():
    return {
        "message": "Dapoyumya Menu Recommendation Assistant API is running."
    }

class RecommendationRequest(BaseModel):
    budget: int = Field(gt=0, description="Budget pelanggan dalam rupiah")
    people_count: int = Field(gt=0, description="Jumlah orang")
    taste_preferences: list[str] = Field(
        default_factory=list,
        description="Preferensi rasa pelanggan"
    )
    menu_type: str = Field(
        default="bebas",
        description="Jenis menu yang diinginkan"
    )

@app.post("/recommend")
async def recommend_menu(request: RecommendationRequest):
    try:
        menu_catalog = get_menu_catalog()

        user_input = f"""
        Budget: Rp{request.budget}
        Jumlah orang: {request.people_count}
        Preferensi rasa: {request.taste_preferences}
        Jenis menu: {request.menu_type}

        Berikan rekomendasi menu yang sesuai dengan kebutuhan tersebut.
        Setiap menu harus memiliki:
        - name: nama produk sesuai katalog
        - size: ukuran paket yang tersedia
        - quantity: jumlah paket

        Pastikan estimated_total tidak perlu dihitung.
        """

        response = await client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": SYSTEM_PROMPT
                    + "\n\nKATALOG MENU:\n"
                    + json.dumps(menu_catalog, ensure_ascii=False)
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        ai_result = json.loads(response.choices[0].message.content)

        validated = validate_recommendation(ai_result)

        if not validated["recommended_menus"]:
            validated["budget_status"] = "no suitable menu"
        elif validated["estimated_total"] <= request.budget:
            validated["budget_status"] = "within budget"
        else:
            validated["budget_status"] = "over budget"

        validated["recommendation_reason"] = ai_result.get(
            "recommendation_reason", ""
        )

        # Menambahkan status budget untuk setiap alternatif
        for alternative in validated["alternatives"]:
            alternative["budget_status"] = (
                "within budget"
                if alternative["estimated_total"] <= request.budget
                else "over budget"
            )

        return validated

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Terjadi kesalahan saat membuat rekomendasi: {str(e)}"
        )

# ==========================================
# PROMPT ENGINEERING EXPERIMENT
# ==========================================

@app.post("/experiment")
async def experiment_prompt(
    request: RecommendationRequest,
    prompt_version: str
):
    try:
        # 1. Mengambil katalog produk
        menu_catalog = get_menu_catalog()

        # 2. Memilih prompt berdasarkan versi eksperimen
        prompts = {
            "A": PROMPT_A,
            "B": PROMPT_B,
            "C": SYSTEM_PROMPT
        }

        # 3. Memvalidasi versi prompt
        if prompt_version not in prompts:
            raise HTTPException(
                status_code=400,
                detail="Prompt harus A, B, atau C."
            )

        # 4. Menyiapkan input pengujian
        user_input = f"""
        Budget: Rp{request.budget}
        Jumlah orang: {request.people_count}
        Preferensi rasa: {request.taste_preferences}
        Jenis menu: {request.menu_type}

        Berikan rekomendasi menu berdasarkan informasi tersebut.
        Pastikan jawaban menggunakan format JSON yang valid.
        """

        # 5. Mengirim permintaan ke Groq API
        response = await client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": prompts[prompt_version]
                    + "\n\nKATALOG MENU:\n"
                    + json.dumps(menu_catalog, ensure_ascii=False)
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            temperature=0.2,
            response_format={"type": "json_object"}
        )

        # 6. Mengambil hasil AI
        ai_result = json.loads(
            response.choices[0].message.content
        )

        # 7. Mengembalikan hasil eksperimen
        return {
            "prompt_version": prompt_version,
            "input": request.model_dump(),
            "actual_output": ai_result
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Terjadi kesalahan saat eksperimen prompt: {str(e)}"
        )