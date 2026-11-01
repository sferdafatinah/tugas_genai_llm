import json
from pathlib import Path

# Menentukan lokasi file katalog menu
DATA_PATH = Path(__file__).parent / "menu_data.json"


def load_menu_data():
    """Membaca seluruh data menu dari file JSON."""
    with open(DATA_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def get_menu_catalog():
    """Mengambil katalog menu yang tersedia."""
    return load_menu_data()


def find_menu_by_name(menu_name: str):
    """Mencari produk berdasarkan nama dalam katalog."""
    catalog = get_menu_catalog()

    for item in catalog:
        if item["name"].lower() == menu_name.lower():
            return item

    return None


def validate_menu_items(menus: list):
    """Memvalidasi daftar menu dan menghitung total harganya."""

    validated_menus = []
    total = 0

    for menu in menus:
        product = find_menu_by_name(menu["name"])

        if product is None:
            continue

        size = str(menu["size"])

        if size not in product["price"]:
            continue

        quantity = int(menu.get("quantity", 1))

        if quantity <= 0:
            continue

        unit_price = product["price"][size]
        subtotal = unit_price * quantity

        validated_menus.append({
            "name": product["name"],
            "size": size,
            "quantity": quantity,
            "unit_price": unit_price,
            "subtotal": subtotal
        })

        total += subtotal

    return {
        "menus": validated_menus,
        "total": total
    }


def validate_recommendation(recommendation: dict):
    """Memvalidasi rekomendasi utama dan alternatif."""

    # Validasi rekomendasi utama
    main_result = validate_menu_items(
        recommendation.get("recommended_menus", [])
    )

    # Validasi setiap alternatif
    validated_alternatives = []

    for alternative in recommendation.get("alternatives", []):
        alternative_result = validate_menu_items(
            alternative.get("menus", [])
        )

        validated_alternatives.append({
            "menus": alternative_result["menus"],
            "estimated_total": alternative_result["total"],
            "reason": alternative.get("reason", "")
        })

    return {
        "recommended_menus": main_result["menus"],
        "estimated_total": main_result["total"],
        "alternatives": validated_alternatives
    }