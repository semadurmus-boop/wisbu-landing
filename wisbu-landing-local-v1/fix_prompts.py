import re

file_path = r"C:\Users\SEMA\Desktop\wisbu-ocr-demo\cloud_prompts.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix CANDIDATE_V2_CORE
candidate_v2 = """CANDIDATE_V2_CORE = CANDIDATE_V1_CORE.replace(
    "beş alanlı JSON", "yedi alanlı JSON"
).replace(
    "Yalnızca istenen beş alanı içeren",
    "- description: Fatura/Fiş üzerindeki genel açıklama, mal/hizmet detayı. Yoksa null döndür.\\n"
    "- due_date: Faturanın son ödeme tarihi (DD.MM.YYYY). Fatura tarihi (document_time) ile karıştırma. Açıkça yazmıyorsa null döndür.\\n\\n"
    "Yalnızca istenen yedi alanı içeren"
)"""

content = re.sub(
    r"CANDIDATE_V2_CORE = CANDIDATE_V1_CORE.*?\"\"\"", 
    candidate_v2, 
    content, 
    flags=re.DOTALL
)

# Fix DEEPSEEK_EXACT_INVOICE_V3
v3_code = """DEEPSEEK_EXACT_INVOICE_V3 = DEEPSEEK_EXACT_INVOICE_V2.replace(
    "beş alanlı JSON", "yedi alanlı JSON"
).replace(
    "Yalnızca istenen beş alanı içeren",
    "- description: Yalnızca belgede açıkça bulunan genel “Açıklama”, “Not” veya işlemin amacını anlatan benzer bir metni döndür. Satın alınan ürünleri, ürün satırlarını veya ürün adlarını noktalı virgülle veya başka bir şekilde birleştirip açıklama oluşturma. Yalnızca ürün listesi varsa description alanına null döndür. Belgedeki açıklama metnine ürünleri ekleme ve bulunmayan bir açıklama üretme.\\n"
    "- due_date: Faturanın son ödeme tarihi (DD.MM.YYYY). Fatura tarihi (document_time) ile karıştırma. Açıkça yazmıyorsa null döndür.\\n\\n"
    "Yalnızca istenen yedi alanı içeren"
)"""

content = re.sub(
    r"DEEPSEEK_EXACT_INVOICE_V3 = DEEPSEEK_EXACT_INVOICE_V2.*?\"\"\"",
    v3_code,
    content,
    flags=re.DOTALL
)

# Fix DEEPSEEK_EXACT_INVOICE_V4
v4_code = """DEEPSEEK_EXACT_INVOICE_V4 = DEEPSEEK_EXACT_INVOICE_V2.replace(
    "beş alanlı JSON", "yedi alanlı JSON"
).replace(
    "Yalnızca istenen beş alanı içeren",
    "- description: Yalnızca yapılan işin nedenini veya işlemi anlatan, belgede açıkça yazılı işleme özgü not metni olsun.\\n"
    "  1. “Mal Hizmet” tablosundaki kalemleri, ürünleri, miktarı, birim fiyatı ve tutarı açıklamaya taşıma.\\n"
    "  2. Not kutusundaki genel e-arşiv/iletişim/yasal metni, tutarın yazıyla karşılığını, banka ve IBAN bilgilerini açıklamaya taşıma.\\n"
    "  3. Aynı not kutusunda genel metinle gerçek işlem açıklaması birlikteyse yalnızca gerçek işlem açıklamasını seç.\\n"
    "  4. Metni uydurma veya ürün satırıyla birleştirme.\\n"
    "  5. İşleme özgü açıklama yoksa null döndür.\\n"
    "- due_date: Faturanın son ödeme tarihi (DD.MM.YYYY). Fatura tarihi (document_time) ile karıştırma. Açıkça yazmıyorsa null döndür.\\n\\n"
    "Yalnızca istenen yedi alanı içeren"
)"""

content = re.sub(
    r"DEEPSEEK_EXACT_INVOICE_V4 = DEEPSEEK_EXACT_INVOICE_V2.*?'''",
    v4_code,
    content,
    flags=re.DOTALL
)


# Fix DEEPSEEK_EXACT_INVOICE_V5
v5_code = """DEEPSEEK_EXACT_INVOICE_V5 = DEEPSEEK_EXACT_INVOICE_V2.replace(
    "beş alanlı JSON", "yedi alanlı JSON"
).replace(
    "Yalnızca istenen beş alanı içeren",
    "- description: Yalnızca belgedeki işleme özgü açıklama/not olsun. Ürün veya hizmet tablosu satırlarını, miktar/fiyatları, genel e-arşiv bildirimini ve banka bilgilerini ekleme. İşleme özgü not yoksa null dön.\\n"
    "- due_date: Yalnızca açıkça yazılı son ödeme tarihi olsun. Fatura tarihi (document_time) ile karıştırma. Açıkça yazmıyorsa null döndür.\\n\\n"
    "Yalnızca istenen yedi alanı içeren"
)"""

content = re.sub(
    r"DEEPSEEK_EXACT_INVOICE_V5 = DEEPSEEK_EXACT_INVOICE_V2.*?'''",
    v5_code,
    content,
    flags=re.DOTALL
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Prompts fixed successfully.")
