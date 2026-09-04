"""
Seeds the database with the same sample data currently hardcoded in
the frontend's js/main.js — so switching the frontend to fetch() from
the API produces identical content to what's there now.

Run with:  python seed.py
Safe to re-run: it clears and re-inserts (dev convenience only —
don't run this against a production database with real user data).
"""

from database.connection import SessionLocal, engine, Base
from database.models import State, District, Temple, Festival, Trail

Base.metadata.create_all(bind=engine)

STATES = [
    ("Tamil Nadu", "south"), ("Kerala", "south"), ("Karnataka", "south"),
    ("Andhra Pradesh", "south"), ("Telangana", "south"),
    ("Uttar Pradesh", "north"), ("Uttarakhand", "north"), ("Rajasthan", "north"),
    ("Haryana", "north"), ("Delhi", "north"),
    ("Odisha", "east"), ("West Bengal", "east"), ("Bihar", "east"), ("Jharkhand", "east"),
    ("Gujarat", "west"), ("Maharashtra", "west"), ("Goa", "west"),
    ("Madhya Pradesh", "central"), ("Chhattisgarh", "central"),
    ("Assam", "northeast"), ("Tripura", "northeast"), ("Meghalaya", "northeast"),
]

TEMPLES = [
    dict(slug="brihadeeswarar-temple", name="Brihadeeswarar Temple", local_name="பெரிய கோயில்",
         city="Thanjavur", state="Tamil Nadu", deity="Shiva", architecture_style="Dravidian",
         historical_period="11th century · Chola", heritage_status="UNESCO World Heritage",
         latitude=10.7828, longitude=79.1318,
         description="A colossal Chola-era temple crowned by one of the tallest vimanas in South India.",
         history="Commissioned by Rajaraja Chola I and completed around 1010 CE to mark the strength of the Chola empire.",
         timings="6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM"),
    dict(slug="meenakshi-amman-temple", name="Meenakshi Amman Temple", local_name="மீனாட்சி அம்மன்",
         city="Madurai", state="Tamil Nadu", deity="Meenakshi (Parvati)", architecture_style="Dravidian",
         historical_period="6th–17th century · Pandya/Nayak", heritage_status="Living Heritage",
         latitude=9.9195, longitude=78.1193,
         description="A sprawling temple complex famed for its painted gopurams and thousand-pillar hall.",
         history="Its core is ancient, but most of the present structure dates to the Nayak rulers of the 16th–17th centuries.",
         timings="5:00 AM – 12:30 PM, 4:00 PM – 9:30 PM"),
    dict(slug="thirupparankundram-murugan-temple", name="Thirupparankundram Murugan Temple", local_name="திருப்பரங்குன்றம் முருகன் கோவில்",
         city="Madurai", state="Tamil Nadu", deity="Murugan", architecture_style="Rock-cut Dravidian",
         historical_period="8th century onwards", heritage_status="Living Heritage",
         latitude=9.8815, longitude=78.0715,
         description="A revered Murugan shrine carved into a hill at Thirupparankundram, near Madurai.",
         history="The temple is associated with Murugan's marriage to Deivanai and has long been one of the Arupadai Veedu pilgrimage sites.",
         timings="6:00 AM – 1:00 PM, 4:00 PM – 8:30 PM"),
    dict(slug="kapaleeshwarar-temple", name="Kapaleeshwarar Temple", local_name="கபாலீசுவரர் கோவில்",
         city="Chennai", state="Tamil Nadu", deity="Shiva", architecture_style="Dravidian",
         historical_period="7th century origins · later rebuilt", heritage_status="Living Heritage",
         latitude=13.0339, longitude=80.2693,
         description="A vibrant Shiva temple in Mylapore, celebrated for its colourful gopuram and active ritual calendar.",
         history="The present complex reflects later Dravidian rebuilding, while the shrine's traditions reach back to the early Tamil bhakti period.",
         timings="5:30 AM – 12:00 PM, 4:00 PM – 9:00 PM"),
    dict(slug="parthasarathy-temple", name="Parthasarathy Temple", local_name="பார்த்தசாரதி பெருமாள் கோவில்",
         city="Chennai", state="Tamil Nadu", deity="Vishnu (Krishna)", architecture_style="Dravidian",
         historical_period="8th century · Pallava", heritage_status="Living Heritage",
         latitude=13.0540, longitude=80.2822,
         description="An ancient Vaishnava temple in Triplicane dedicated to Krishna as the charioteer Parthasarathy.",
         history="Traditionally linked to the Pallava era, it is one of Chennai's most important Divya Desam shrines.",
         timings="6:00 AM – 12:00 PM, 4:00 PM – 8:30 PM"),
    dict(slug="pazhamudircholai-murugan-temple", name="Pazhamudircholai Murugan Temple", local_name="பழமுதிர்சோலை முருகன் கோவில்",
         city="Madurai", state="Tamil Nadu", deity="Murugan", architecture_style="Dravidian",
         historical_period="Ancient hill shrine", heritage_status="Living Heritage",
         latitude=10.0800, longitude=78.2168,
         description="A forested hill shrine north of Madurai, honoured as one of Murugan's six sacred abodes.",
         history="The temple's enduring worship is woven into Tamil devotional poetry and the landscape of Azhagar Hills.",
         timings="6:00 AM – 6:00 PM"),
    dict(slug="kottai-mariamman-temple", name="Kottai Mariamman Temple", local_name="கோட்டை மாரியம்மன் கோவில்",
         city="Dindigul", state="Tamil Nadu", deity="Mariamman", architecture_style="Tamil folk-Dravidian",
         historical_period="Historic local shrine", heritage_status="Living Heritage",
         latitude=10.3673, longitude=77.9803,
         description="A well-known Mariamman shrine in Dindigul, central to the city's local worship and annual celebrations.",
         history="The temple preserves a living regional tradition of devotion to the goddess Mariamman.",
         timings="6:00 AM – 12:00 PM, 4:00 PM – 8:30 PM"),
    dict(slug="guruvayur-sri-krishna-temple", name="Guruvayur Sri Krishna Temple", local_name="ഗുരുവായൂർ ശ്രീകൃഷ്ണ ക്ഷേത്രം",
         city="Guruvayur", state="Kerala", deity="Krishna", architecture_style="Kerala",
         historical_period="Ancient tradition", heritage_status="Living Heritage",
         latitude=10.5944, longitude=76.0411,
         description="One of Kerala's most visited Krishna temples, known for its deep devotional tradition and daily rituals.",
         history="The shrine is associated with a cherished local tradition of Krishna worship and has remained a major pilgrimage centre for centuries.",
         timings="3:00 AM – 1:30 PM, 4:30 PM – 9:15 PM"),
    dict(slug="sree-padmanabhaswamy-temple", name="Sree Padmanabhaswamy Temple", local_name="ശ്രീ പത്മനാഭസ്വാമി ക്ഷേത്രം",
         city="Thiruvananthapuram", state="Kerala", deity="Vishnu", architecture_style="Kerala-Dravidian",
         historical_period="Ancient · rebuilt in 18th century", heritage_status="Living Heritage",
         latitude=8.4829, longitude=76.9435,
         description="A monumental Vishnu temple where the deity reclines on Ananta, set in the heart of Thiruvananthapuram.",
         history="The present form was shaped under Travancore patronage, while the temple's worship tradition is much older.",
         timings="3:30 AM – 12:00 PM, 5:00 PM – 8:30 PM"),
    dict(slug="vadakkunnathan-temple", name="Vadakkunnathan Temple", local_name="വടക്കുംനാഥൻ ക്ഷേത്രം",
         city="Thrissur", state="Kerala", deity="Shiva", architecture_style="Kerala",
         historical_period="Medieval", heritage_status="Living Heritage",
         latitude=10.5276, longitude=76.2144,
         description="A historic Shiva temple at the centre of Thrissur, renowned for its mural tradition and monumental wooden roofs.",
         history="The temple is closely connected to the cultural life of Thrissur and the city's famous Pooram season.",
         timings="4:00 AM – 11:00 AM, 5:00 PM – 8:30 PM"),
    dict(slug="sabarimala-sree-dharma-sastha-temple", name="Sabarimala Sree Dharma Sastha Temple", local_name="ശബരിമല ശ്രീ ധർമ്മശാസ്താ ക്ഷേത്രം",
         city="Pathanamthitta", state="Kerala", deity="Ayyappa", architecture_style="Kerala hill shrine",
         historical_period="Ancient pilgrimage tradition", heritage_status="Major Pilgrimage",
         latitude=9.4346, longitude=77.0820,
         description="A forest hill shrine dedicated to Ayyappa, approached through a disciplined seasonal pilgrimage.",
         history="The temple is the focal point of one of India's largest annual pilgrimages, with seasonal opening periods.",
         timings="Seasonal — confirm temple opening dates before travel"),
    dict(slug="konark-sun-temple", name="Konark Sun Temple", local_name="କୋଣାର୍କ",
         city="Konark", state="Odisha", deity="Surya", architecture_style="Kalinga",
         historical_period="13th century · Eastern Ganga", heritage_status="UNESCO World Heritage",
         latitude=19.8876, longitude=86.0945,
         description="Designed as a colossal stone chariot for the sun god, with 24 carved wheels.",
         history="Built around 1250 CE under King Narasimhadeva I of the Eastern Ganga dynasty.",
         timings="6:00 AM – 8:00 PM"),
    dict(slug="kedarnath-temple", name="Kedarnath Temple", local_name="केदारनाथ",
         city="Rudraprayag", state="Uttarakhand", deity="Shiva (Jyotirlinga)", architecture_style="Himalayan Nagara",
         historical_period="8th century (site older)", heritage_status="Char Dham",
         latitude=30.7346, longitude=79.0669,
         description="One of the twelve Jyotirlingas, set high in the Garhwal Himalayas.",
         history="Associated with Adi Shankaracharya, who is believed to have revived the shrine in the 8th century.",
         timings="Seasonal — open Apr/May to Nov, weather dependent"),
    dict(slug="kandariya-mahadeva", name="Kandariya Mahadeva", local_name="कंदारिया महादेव",
         city="Khajuraho", state="Madhya Pradesh", deity="Shiva", architecture_style="Nagara",
         historical_period="11th century · Chandela", heritage_status="UNESCO World Heritage",
         latitude=24.8318, longitude=79.9199,
         description="The largest and most ornate of the Khajuraho temples, celebrated for its sculpture.",
         history="Built under the Chandela dynasty, likely completed around 1030 CE.",
         timings="6:00 AM – 6:00 PM"),
    dict(slug="lingaraj-temple", name="Lingaraj Temple", local_name="ଲିଙ୍ଗରାଜ",
         city="Bhubaneswar", state="Odisha", deity="Harihara", architecture_style="Kalinga",
         historical_period="11th century · Somavamshi", heritage_status="Living Heritage",
         latitude=20.2372, longitude=85.8345,
         description="The largest temple in Bhubaneswar, dedicated to a joint form of Shiva and Vishnu.",
         history="Built primarily under the Somavamshi dynasty, with later additions by the Ganga kings.",
         timings="6:00 AM – 9:00 PM"),
]

FESTIVALS = [
    dict(name="Mahashivaratri", typical_timing="Feb–Mar",
         significance="A night-long vigil of fasting and worship marking Shiva's cosmic dance.",
         temple_slug=None),
    dict(name="Chithirai Festival", typical_timing="Apr",
         significance="The celestial wedding of Meenakshi and Sundareswarar, re-enacted each year.",
         temple_slug="meenakshi-amman-temple"),
    dict(name="Karthigai Deepam", typical_timing="Nov–Dec",
         significance="A giant beacon is lit atop the hill, visible for miles, symbolising Shiva as light.",
         temple_slug=None),
]

TRAILS = [
    dict(slug="chola-heritage-trail", name="Chola Heritage Trail", region="Tamil Nadu",
         recommended_days="3–4 days",
         description="The great imperial Chola temples — Thanjavur, Gangaikonda Cholapuram, Darasuram.",
         temple_slugs=["brihadeeswarar-temple"]),
    dict(slug="unesco-heritage-trail", name="UNESCO Heritage Trail", region="Pan-India",
         recommended_days="10–14 days",
         description="India's temple sites inscribed on the World Heritage List, town by town.",
         temple_slugs=["brihadeeswarar-temple", "konark-sun-temple", "kandariya-mahadeva"]),
]


def seed():
    db = SessionLocal()
    try:
        # states
        state_map = {}
        for name, region in STATES:
            existing = db.query(State).filter_by(name=name).first()
            if not existing:
                existing = State(name=name, region=region)
                db.add(existing)
                db.flush()
            state_map[name] = existing

        # temples
        temple_map = {}
        for t in TEMPLES:
            existing = db.query(Temple).filter_by(slug=t["slug"]).first()
            if existing:
                temple_map[t["slug"]] = existing
                continue
            temple = Temple(
                slug=t["slug"], name=t["name"], local_name=t["local_name"],
                city=t["city"], state_id=state_map[t["state"]].id,
                deity=t["deity"], architecture_style=t["architecture_style"],
                historical_period=t["historical_period"], heritage_status=t["heritage_status"],
                latitude=t["latitude"], longitude=t["longitude"],
                description=t["description"], history=t["history"], timings=t["timings"],
            )
            db.add(temple)
            db.flush()
            temple_map[t["slug"]] = temple

        # festivals
        for f in FESTIVALS:
            existing = db.query(Festival).filter_by(name=f["name"]).first()
            if existing:
                continue
            temple_id = temple_map[f["temple_slug"]].id if f["temple_slug"] else None
            db.add(Festival(name=f["name"], typical_timing=f["typical_timing"],
                             significance=f["significance"], temple_id=temple_id))

        # trails
        for tr in TRAILS:
            existing = db.query(Trail).filter_by(slug=tr["slug"]).first()
            if existing:
                continue
            trail = Trail(slug=tr["slug"], name=tr["name"], region=tr["region"],
                           description=tr["description"], recommended_days=tr["recommended_days"])
            trail.temples = [temple_map[s] for s in tr["temple_slugs"]]
            db.add(trail)

        db.commit()
        print(f"Seeded {len(STATES)} states, {len(TEMPLES)} temples, {len(FESTIVALS)} festivals, {len(TRAILS)} trails.")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
