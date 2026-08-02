import json
import re
import os
from collections import Counter
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
from wordcloud import WordCloud
from Sastrawi.StopWordRemover.StopWordRemoverFactory import StopWordRemoverFactory

def clean_html(html_content):
    """
    Remove HTML tags and return plain text.
    """
    if not html_content:
        return ""
    # Use BeautifulSoup to parse HTML and extract text
    soup = BeautifulSoup(html_content, "html.parser")
    text = soup.get_text(separator=" ")
    return text

def preprocess_text(text):
    """
    Lowercase, remove special characters, and return a list of words.
    """
    # Lowercase
    text = text.lower()
    # Replace non-alphabetic characters with spaces
    text = re.sub(r'[^a-zA-Z\s\-]', ' ', text)
    # Split by whitespace
    words = text.split()
    # Clean words (remove leading/trailing hyphens)
    words = [w.strip('-') for w in words]
    # Filter out empty strings and single characters
    words = [w for w in words if len(w) > 1]
    return words

def main():
    archive_path = os.path.join("data", "archive.json")
    output_image_path = os.path.join("process", "wordcloud.svg")
    
    if not os.path.exists(archive_path):
        print(f"Error: Archive file not found at {archive_path}")
        return
        
    print(f"Loading data from {archive_path}...")
    with open(archive_path, 'r', encoding='utf-8') as f:
        archive_data = json.load(f)
        
    print(f"Processing {len(archive_data)} entries...")
    
    all_words = []
    
    # 1. Extract and clean text from each entry (strictly only textBody)
    for entry in archive_data:
        text_body = entry.get("textBody", "")
        clean_text = clean_html(text_body)
        words = preprocess_text(clean_text)
        all_words.extend(words)

    print(f"Total word tokens extracted: {len(all_words)}")
    
    # 2. Set up Stopwords
    # Retrieve standard Sastrawi stopwords
    factory = StopWordRemoverFactory()
    sastrawi_stopwords = set(factory.get_stop_words())
    
    # Additional Indonesian stopwords categorized to clean up statistics
    # Category 1: Prepositions and Conjunctions (expanded grammatical particles)
    prepositions_conjunctions = {
        # Conjunctions
        "dan", "atau", "bahwa", "serta", "karena", "tapi", "namun", "tetapi", 
        "maka", "jadi", "para", "sebagaimana", "maupun", "bila", "jika", "kalau", 
        "supaya", "agar", "bagaikan", "sejak", "sewaktu", "ketika", "selama", 
        "sementara", "walaupun", "meskipun", "kendatipun", "padahal", "sedangkan", 
        "sebaliknya", "melainkan", "bahwasanya",
        # Prepositions
        "di", "dari", "ke", "untuk", "dalam", "oleh", "pada", "dengan", "tentang", 
        "sebagai", "bagi", "kepada", "melalui", "sebelum", "setelah", "hingga", 
        "sampai", "terhadap", "selain", "secara", "atas",
        # Pronouns
        "ini", "itu", "ia", "dia", "mereka", "beliau", "kami", "kita", "saya", "olehnya", 
        "siapa", "apa", "dimana", "kapan", "mana",
        # Particles & Adverbs
        "yang", "ada", "adalah", "juga", "saja", "bisa", "hal", "hanya", "lalu", 
        "kemudian", "begitu", "seperti", "sangat", "lebih", "sudah", "belum", 
        "sedang", "baru", "tersebut", "suatu", "bukan", "tidak", "tak", "tiada", 
        "bukanlah", "tidakkah", "jangan", "janganlah", "kembali", "ykh", "yth", 
        "hormat", "khususnya", "umumnya", "adanya", "seolah", "seolah-olah", 
        "pun", "kok", "toh", "sih"
    }

    # Category 2: Numbers, Ordinals, & Quantifiers
    numbers_ordinals_quantifiers = {
        # Cardinal Numbers
        "nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", 
        "sembilan", "sepuluh", "sebelas", "belas", "puluh", "ratus", "ribu", "juta", 
        "miliar", "triliun",
        # Ordinals
        "pertama", "kedua", "ketiga", "keempat", "kelima", "keenam", "ketujuh", 
        "kedelapan", "kesembilan", "kesepuluh", "terakhir", "awal", "akhir", 
        "pertengahan", "ke-", "kedua-duanya",
        # Quantifiers
        "banyak", "sedikit", "beberapa", "sebagian", "seluruh", "semua", 
        "masing-masing", "setiap", "tiap", "tiap-tiap", "suatu", "sesuatu"
    }

    # Category 3: Generic / Grammatical Helper Verbs
    generic_verbs = {
        # Copula & Helper Verbs
        "menjadi", "melakukan", "terjadi", "justru", "semakin", "segera", "terus",
        "berbagai", "termasuk", "sesuai", "membuat", "memberikan", "dilakukan", 
        "dibuat", "diberikan", "berupa", "berjalan", "berada", "tersebut", "terkait", 
        "terdapat", "memiliki", "mempunyai", "mengalami", "menyebabkan", "mengakibatkan", 
        "berisi", "berdasarkan", "yaitu", "yakni", "adalah", "ialah"
    }

    # Category 4: Generic Nouns & Administrative Meta-Words
    generic_nouns_meta = {
        # Time Metrics
        "tahun", "hari", "bulan", "minggu", "tanggal", "waktu",
        # Generic People/Roles
        "orang", "pihak", "tim", "bapak", "ir", "pihaknya",
        # Administrative Meta-Words
        "hal", "perihal", "surat", "terbuka", "selebaran", "cuitan", "sumber", 
        "gambar", "foto", "pamflet", "suasana", "dokumentasi", "kegiatan", 
        "masalah", "tempat", "lokasi", "presidium", "nomor", "no", "nama", 
        "bagian", "dokumen", "lampiran", "naskah", "halaman", "hlm", "isi", 
        "judul", "data", "berkas", "tanda", "tangan", "ttd", "alamat", "kota", 
        "provinsi", "perhatian", "tengah",
        # Spatial Words
        "jalan", "jl", "raya",
        # Days
        "senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "ahad",
        # Months
        "januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", 
        "september", "oktober", "november", "desember"
    }
    
    custom_stopwords = (
        prepositions_conjunctions | 
        numbers_ordinals_quantifiers | 
        generic_verbs | 
        generic_nouns_meta
    )
    
    all_stopwords = sastrawi_stopwords.union(custom_stopwords)
    
    # 3. Filter out stopwords (Pass 1 - raw words)
    filtered_words = [w for w in all_words if w not in all_stopwords]
    print(f"Word tokens after first stopword removal: {len(filtered_words)}")
    
    # 4. Stem remaining words to their root form using Sastrawi with a dictionary cache
    print("Stemming words to root forms...")
    from Sastrawi.Stemmer.StemmerFactory import StemmerFactory
    stemmer_factory = StemmerFactory()
    stemmer = stemmer_factory.create_stemmer()
    
    stemmed_words = []
    stem_cache = {}
    for word in filtered_words:
        if word not in stem_cache:
            stem_cache[word] = stemmer.stem(word)
        stemmed_words.append(stem_cache[word])
        
    print(f"Stemming complete. Unique words cached and stemmed: {len(stem_cache)}")
    
    # 5. Filter out stopwords (Pass 2 - root words check, and remove incorrect stems like 'lidi')
    final_words = [w for w in stemmed_words if w and w not in all_stopwords and w != "lidi"]
    print(f"Word tokens after final root-word stopword removal: {len(final_words)}")
    
    # 6. Count frequencies
    word_counts = Counter(final_words)
    
    # Display the top 100 words in console
    print("\n--- Top 100 Most Frequent Words ---")
    top_100 = word_counts.most_common(100)
    for word, count in top_100:
        print(f"{word}: {count}")
        
    # Get top 10 words for coloring
    top_10 = set([w for w, c in word_counts.most_common(10)])
    
    # Custom color function: Top 10 are white (#ffffff), others are gray (#A1A1AA)
    def custom_color_func(word, font_size, position, orientation, random_state=None, **kwargs):
        return "#ffffff" if word in top_10 else "#A1A1AA"
        
    # 7. Generate Word Cloud
    print("\nGenerating word cloud...")
    wordcloud = WordCloud(
        width=1600,
        height=900,
        mode='RGBA',
        background_color=None,      # Transparent background
        max_words=100,              # Take top 100 words
        min_font_size=10,
        max_font_size=150,
        margin=24,                  # Increased padding/margin between words
        random_state=42,            # For reproducible layout
        prefer_horizontal=0.7,      # Balance horizontal and vertical layout
        color_func=custom_color_func
    ).generate_from_frequencies(word_counts)
    
    # Save the output file as SVG
    os.makedirs(os.path.dirname(output_image_path), exist_ok=True)
    svg_content = wordcloud.to_svg(embed_font=True)
    with open(output_image_path, "w", encoding="utf-8") as f:
        f.write(svg_content)
    
    print(f"Word cloud graphic saved successfully to: {output_image_path}")

if __name__ == "__main__":
    main()
