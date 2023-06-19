#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Item, SubItem, Check, Order, Modifier, ItemMod

menu_items = []
sub_items = []
item_mods = []

def make_item(name, button, image, price, temperature, category, menu):
    item = Item(
        name = name,
        button_name = button,
        image = image,
        price = price,
        temperature = temperature,
        category = category,
        menu = menu
    )

    menu_items.append(item)

def make_subitem(name, button, price, category, menu_cat):
    subitem = SubItem(
        name = name,
        button_name = button,
        price = price,
        category = category,
        menu_cat = menu_cat
    )

    sub_items.append(subitem)

def make_item_mod(name, mods):
    item = Item.query.filter_by(button_name=name).first()
    
    for mod in mods:
        mod_obj = SubItem.query.filter(SubItem.name == mod).first()
        
        item_mod = ItemMod(
            item_id = item.id,
            sub_id = mod_obj.id
        )
    
        item_mods.append(item_mod)


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Item.query.delete()
        SubItem.query.delete()
        Order.query.delete()
        Check.query.delete()
        Modifier.query.delete()

        # #Brunch
        make_item("RH Scramble", "Scramble", "https://fastly.4sqi.net/img/general/600x600/9052728_546egmQpd26GnE6eT6nvBDoV1WoCt-CFK-S_lrXmF1A.jpg", 22, True, "mornings", "brunch")
        make_item("Thick Cut Pork Belly Bacon", "Bacon", "https://s3-media0.fl.yelpcdn.com/bphoto/qllR4aV8wUaVkx3QElSHUQ/258s.jpg", 14, False, "mornings", "brunch")
        make_item("New York Lox", "Lox", "https://images.otstatic.com/prod1/30615159/3/large.jpg", 28, False, "mornings", "brunch")
        make_item("Avocado Toast", "Avocado Toast", "https://s3-media0.fl.yelpcdn.com/bphoto/ZkAS-DW--MaK6JO1aBtmJA/348s.jpg", 20, False, "mornings", "brunch")
        make_item("Fruit Plate", "Fruit", None, 6, False, "mornings", "brunch")
        make_item("Side Scrambe", "Side Scramble", None, 12, True, "mornings", "brunch")
        
        # Appetizers
        make_item("Artisanal Prosciutto", "Prosciutto", "https://www.biteofthebest.com/wp-content/uploads/IMG_7460-scaled.jpeg", 24, False, "appetizers", "all")
        make_item("Delice De Bourgogne Cheese", "Delice", "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/BJXtuXOglLqoTztrgta_568Bk8g=/fit-in/1660x934/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/MQMLWPIM3BFKRCTHNG7M44O3DA.JPG", 21, False, "appetizers", "all")
        make_item("Prosciutto and Delice Board", "Combo Board", "https://cloudfront-us-east-1.images.arcpublishing.com/dmn/BO6BZQEIKBCATFEFF47GCGPU6Y.jpg", 45,  False, "appetizers", "all")
        make_item("Shrimp Cocktail", "Shrimp Cocktail", "https://www.gannett-cdn.com/authoring/2019/09/11/NPPP/ghows_image-LK-a78bcbc7-19f7-452a-8e70-a02b7f562007.jpeg", 25, False, "appetizers", "all")
        make_item("Crispy Artichokes", "Artichokes", "https://images.squarespace-cdn.com/content/v1/594a8fc04f14bcf90f3a113d/1605190704638-Y3HYK6FES88NPGHPY6AI/DSC04026.jpg", 21, False, "appetizers", "all")
        make_item("Burrata", "Burrata", "https://www.papercitymag.com/wp-content/uploads/2021/05/RH_Food_1.jpg", 25, False, "appetizers", "all")

        #Salads
        make_item("Gem Lettuce", "Gem", "https://www.papercitymag.com/wp-content/uploads/2021/05/RH_Food_4-1024x782.jpg", 18, False, "salads", "all")
        make_item("Arugula", "Arugula", "https://images.squarespace-cdn.com/content/v1/61bfe087831de73fc8f98de8/1640036085919-VO995842RG0ZXYJGQ8XZ/9841C897-78D6-4515-9629-A4A9D548F244.jpg", 18, False, "salads", "all")
        make_item("Shaved Vegetables", "Shaved Veg", "https://media-cdn.tripadvisor.com/media/photo-s/0a/54/ba/09/shaved-vegetable-salad.jpg", 19, False, "salads", "all")
        make_item("Caesar", "Caesar", "https://media-cdn.tripadvisor.com/media/photo-s/1c/f7/66/58/photo3jpg.jpg", 20, False, "salads", "all")
        
        #Entrees
        make_item("RH Burger", "RH Burger", "https://images.squarespace-cdn.com/content/v1/594a8fc04f14bcf90f3a113d/1547007276600-I53LSLMFI39OLXRBJY18/Snapseed+130.jpg", 22, True, "entrees", "all")
        make_item("Shaved Ribeye on Garlic Bread", "Shaved Ribeye", "https://s3-media0.fl.yelpcdn.com/bphoto/F1M_gQDYg5Xu4bXVftQ2Pw/l.jpg", 30, True, "entrees", "all")
        make_item("Truffled Grilled Cheese", "Grilled Cheese", "https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/o4-8ScxNQ4pTFBPecrBYCM9mDpg=/fit-in/1660x934/smart/filters:no_upscale()/cloudfront-us-east-1.images.arcpublishing.com/dmn/RW5RMOBESFGXHNZR3NPSDPCY3E.JPG", 20, False, "entrees", "brunch")
        make_item("Lobster Roll", "Lobster Roll", "https://www.papercitymag.com/wp-content/uploads/2021/05/RH_Food_3-1024x833.jpg", 34, False, "entrees", "all")
        make_item("Broiled Salmon", "Salmon", "https://www.biteofthebest.com/wp-content/uploads/IMG_1991-2-scaled.jpg", 36, True, "entrees", "all")
        make_item("Roasted Half Chicken", "Roti", "https://images.otstatic.com/prod/26702629/2/huge.jpg", 38, False, "entrees", "all")
        make_item("16oz Charred Ribeye Steak", "Ribeye Steak", "https://media-cdn.tripadvisor.com/media/photo-s/24/61/af/2c/rh-rooftop-restaurant.jpg", 64, True, "entrees", "all")

        #Sides
        make_item("French Fries", "Fries", "https://i0.wp.com/chiluxetravel.com/wp-content/uploads/2022/06/IMG_8645-869x1024.jpeg", 10, False, "sides", "all")
        make_item("Truffled Fries", "Truff Fries", "https://media-cdn.tripadvisor.com/media/photo-s/1d/37/8d/df/caption.jpg", 20, False, "sides", "all")
        make_item("Simple Green Salad", "Simple Salad", "https://s3-media0.fl.yelpcdn.com/bphoto/Z5H1o3-n_LJp7TTuQjozMQ/348s.jpg", 9, False, "sides", "all")
        make_item("Yukon Gold Potato Puree", "Puree", None, 11, False, "sides", "all")
        make_item("Charred Heirloom Broccolini", "Broccolini", "https://s3-media0.fl.yelpcdn.com/bphoto/vZfabHB6Gf2amHMK_mkkug/348s.jpg", 13, False, "sides", "all")
        make_item("Wild Mushrooms", "Mushrooms", "https://media-cdn.tripadvisor.com/media/photo-p/1d/37/8d/e0/caption.jpg", 15, False, "sides", "all")

        #Sweets
        make_item("Homemade Chocolate Chip Cookies", "Cookies", "https://s3-media0.fl.yelpcdn.com/bphoto/Yr56idJBD5uHnIasA7amww/348s.jpg", 10, False, "sweets", "all")
        make_item("Vanilla Gelato", "Van Gelato", None, 9, False, "sweets", "all")
        make_item("Chocolate Gelato", "Choc Gelato", None, 9, False, "sweets", "all")
        make_item("Salted Caramel Gelato", "Carm Gelato", None, 9, False, "sweets", "all")
        make_item("Raspberry Sorbet", "Rasp Sorb", None, 9, False, "sweets", "all")

        #Beverages
        make_item("RH Bellini", "Bellini", None, 16, False, "cocktails", "beverages")
        make_item("RH Mimosa", "Mimosa", None, 16, False, "cocktails", "beverages")
        make_item("Bisol Prosecco", "Prosecco", None, 15, False, "sparkling", "beverages")
        make_item("Schramsberg Brut Rose", "Schramsberg", None, 22, False, "sparkling", "beverages")
        make_item("Veuve Clicquot Brut Champagne", "Veuve", None, 35, False, "sparkling", "beverages")
        make_item("Scarpetta Pinot Grigio", "Scarpetta", None, 15, False, "white wine", "beverages")
        make_item("Alan Scott Sauvignon Blanc", "Alan Scott", None, 16, False, "white wine", "beverages")
        make_item("Chalk Hill Chardonnay", "Chalk Hill", None, 18, False, "white wine", "beverages")
        make_item("Mirival Studio Rose", "Mirival", None, 17, False, "rose wine", "beverages")
        make_item("Minuty M Rose", "Minuty", None, 22, False, "rose wine", "beverages")
        make_item("Peyrassol Cuvee", "Peyrassol", None, 22, False, "rose wine", "beverages")
        make_item("Lioco Pinot Noir", "Lioco", None, 18, False, "red wine", "beverages")
        make_item("Catena Malbec", "Catena", None, 15, False, "red wine", "beverages")
        make_item("Duckhorn Cabernet Sauvignon", "Duckhorn", None, 37, False, "red wine", "beverages")
        make_item("Stella Artois Belgian Pilsner", "Stella", None, 8, False, "beer", "beverages")
        make_item("Goose Island IPA", "Goose IPA", None, 9, False, "beer", "beverages")
        make_item("Kona Big Wave Golden Ale", "Kona", None, 8, False, "beer", "beverages")
        make_item("Golden Road Mango Cart", "Mango Cart", None, 8, False, "beer", "beverages")
        make_item("Ice Water", "Ice Water", None, 0, False, "soft-drinks", "beverages")
        make_item("Lemondae", "Lemonade", None, 6, False, "soft-drinks", "beverages")
        make_item("Orange Juice", "OJ", None, 6, False, "soft-drinks", "beverages")
        make_item("Coke", "Coke", None, 5, False, "soft-drinks", "beverages")
        make_item("Diet Coke", "Diet Coke", None, 5, False, "soft-drinks", "beverages")
        make_item("Fentiman's Ginger Beer", "Ginger Beer", None, 7, False, "soft-drinks", "beverages")
        make_item("Fentiman's Rose Lemonade", "Rose Lemonade", None, 7, False, "soft-drinks", "beverages")
        make_item("Drip Coffee", "Coffee", None, 4, False, "coffee", "beverages")
        make_item("Espresso", "Espresso", None, 4, False, "coffee", "beverages")
        make_item("Cortado", "Cortado", None, 5, False, "coffee", "beverages")
        make_item("Cappuccino", "Capp", None, 6, False, "coffee", "beverages")
        make_item("Latte", "Latte", None, 7, False, "coffee", "beverages")
        make_item("Hot Chocolate", "Hot Choc", None, 5, False, "coffee", "beverages")
        make_item("Cold Brew", "Cold Brew", None, 6, False, "coffee", "beverages")
        make_item("Chai Latte", "Chai", None, 7, False, "tea", "beverages")
        make_item("Matcha Latte", "Matcha", None, 7, False, "tea", "beverages")
        make_item("RH Breakfast", "Breakfast", None, 6, False, "tea", "beverages")
        make_item("Lord Bergamot", "Earl Grey", None, 6, False, "tea", "beverages")
        make_item("Jasmine Silver Tip", "Jasmine", None, 6, False, "tea", "beverages")
        make_item("Meadow Camomile", "Camomile", None, 6, False, "tea", "beverages")
        make_item("Peppermint Leaves", "Peppermint", None, 6, False, "tea", "beverages")
        make_item("Unsweetened Iced Tea", "Iced Tea", None, 5, False, "tea", "beverages")

        db.session.add_all(menu_items)
        db.session.commit()

        # Sub Items
        
        make_subitem("Avocado Add", "Avocado", 4, "add on", "None")
        make_subitem("Bacon Add", "Bacon", 5, "add on", "None")
        make_subitem("Grilled Chicken", "Chicken", 9, "add on", "salads")
        make_subitem("Lobster", "Lobster", 24, "add on", "salads")
        make_subitem("Prosciutto", "Salmon", 18, "add on", "salads")
        make_subitem("Chilled Shrimp", "Shrimp", 13, "add on", "salads")
        make_subitem("Smoked Salmon", "Smoked Sal", 20, "add on", "None")
        make_subitem("Soft Boiled Egg", "SB Egg", 3, "add on", "mornings")
        make_subitem("Add Espresso Shot", "Add Shot", 4, "beverages", "coffee/tea")
        make_subitem("Almond Milk", "Almond mlk", 1, "beverages", "coffee/tea")
        make_subitem("Caramel Syrup", "Caramel", 1, "beverages", "coffee/tea")
        make_subitem("Cream", "Cream", 0, "beverages", "coffee/tea")
        make_subitem("Decaf", "Decaf", 0, "beverages", "coffee/tea")
        make_subitem("Glass", "Glass", 0, "beverages", "beverages")
        make_subitem("Ice", "Ice", 0, "beverages", "beverages")
        make_subitem("Mocha Syrup", "Mocha", 0, "beverages", "coffee/tea")
        make_subitem("Non Fat Milk", "NF mlk", 0, "beverages", "coffee/tea")
        make_subitem("Oat Milk", "Oat mlk", 0, "beverages", "coffee/tea")
        make_subitem("Sugar", "Sugar", 0, "beverages", "coffee/tea")
        make_subitem("Sweetener", "Sweetener", 0, "beverages", "coffee/tea")
        make_subitem("Vanilla Syrup", "Vanilla", 1, "beverages", "coffee/tea")
        make_subitem("Whole Milk", "Whole mlk", 0, "beverages", "coffee/tea")
        make_subitem("XT Hot", "XT Hot", 0, "beverages", "coffee/tea")
        make_subitem("Baguette", "Baguette", 0, "bread", "sides")
        make_subitem("Burger Bun", "Bun", 0, "bread", "None")
        make_subitem("Sourdough Toast", "Toast", 0, "bread", "sides")
        make_subitem("Cheddar", "Cheddar", 0, "cheese", "None")
        make_subitem("Cheese", "Cheese", 0, "cheese", "None")
        make_subitem("Swiss", "Swiss", 0, "cheese", "None")
        make_subitem("Feta", "Feta", 0, "cheese/salad", "salads")
        make_subitem("Grated Parm", "Parm grated", 0, "cheese/salad", "salads")
        make_subitem("Shaved Parm", "Parm shaved", 0, "cheese/salad", "salads")
        make_subitem("Garlic Aioli", "Gar Aioli", 0, "condiment", "None")
        make_subitem("Rosemary Aioli", "Rsmary Aioli", 0, "condiment", "None")
        make_subitem("Truffle Aioli", "Truff Aioli", 0, "condiment", "None")
        make_subitem("Cocktail Sauce", "Cocktail", 0, "condiment", "None")
        make_subitem("Dijon Mustar", "Dijon Must", 0, "condiment", "None")
        make_subitem("Dijonnaise", "Dijo", 0, "condiment", "None")
        make_subitem("Jam", "Jam", 0, "condiment", "sides")
        make_subitem("Ketchup", "Ketchup", 0, "condiment", "None")
        make_subitem("Mayonnaise", "Mayo", 0, "condiment", "None")
        make_subitem("Steak Sauce", "Steak Sauce", 0, "condiment", "None")
        make_subitem("Balsamic Vinegar", "Balsamic", 0, "dressing", "salads")
        make_subitem("Buttermilk Herb", "Buttermilk", 0, "dressing", "salads")
        make_subitem("Caesar Dressing", "Caesar", 0, "dressing", "salads")
        make_subitem("Cider Vinegarette", "Cider", 0, "dressing", "salads")
        make_subitem("Citrus Vinegarette", "Citrus", 0, "dressing", "salads")
        make_subitem("Oil and Vinegar", "Oil & Vin", 0, "dressing", "salads")
        make_subitem("Chives", "Chives", 0, "garnish", "None")
        make_subitem("Lemon", "Lemon", 0, "garnish", "beverages")
        make_subitem("Lime", "Lime", 0, "garnish", "beverages")
        make_subitem("Parsley", "Parsley", 0, "garnish", "None")
        make_subitem("Rosemary", "Rosemary", 0, "garnish", "None")
        make_subitem("Au Jus", "Au Jus", 0, "ingredient", "None")
        make_subitem("Avocado", "Avocado", 0, "ingredient", "None")
        make_subitem("Balsamic Glaze", "Balsamic Glz", 0, "ingredient", "None")
        make_subitem("Beets", "Beets", 0, "ingredient", "None")
        make_subitem("Brown Butter", "Brown bttr", 0, "ingredient", "None")
        make_subitem("Butter", "Butter", 0, "ingredient", "None")
        make_subitem("Capers", "Capers", 0, "ingredient", "None")
        make_subitem("Carrots", "Carrots", 0, "ingredient", "None")
        make_subitem("Cherry Pepper", "Cherry Pepper", 0, "ingredient", "None")
        make_subitem("Chili Paste", "Chili", 0, "ingredient", "None")
        make_subitem("Chive Butter", "Chive bttr", 0, "ingredient", "None")
        make_subitem("Cream Cheese", "Cream Cheese", 0, "ingredient", "None")
        make_subitem("Creme Fraiche", "Fraiche", 0, "ingredient", "None")
        make_subitem("Croutons", "Croutons", 0, "ingredient", "None")
        make_subitem("Drawn Butter", "Drawn bttr", 0, "ingredient", "None")
        make_subitem("Fennel", "Fennel", 0, "ingredient", "None")
        make_subitem("Garlic", "Garlic", 0, "ingredient", "None")
        make_subitem("Garlic Confit", "Confit", 0, "ingredient", "None")
        make_subitem("Grapes", "Grapes", 0, "ingredient", "sides")
        make_subitem("Herbs", "Herbs", 0, "ingredient", "None")
        make_subitem("Honey", "Honey", 0, "ingredient", "coffee/tea")
        make_subitem("Lemon Zest", "Lemon Zest", 0, "ingredient", "None")
        make_subitem("Lettuce", "Lettuce", 0, "ingredient", "None")
        make_subitem("Maple Glaze", "Maple", 0, "ingredient", "brunch")
        make_subitem("Old Bay Seasoning", "Old Bay", 0, "ingredient", "None")
        make_subitem("Olive Oil", "Olive Oil", 0, "ingredient", "None")
        make_subitem("Onion", "Onion", 0, "ingredient", "None")
        make_subitem("Pecans", "Pecans", 0, "ingredient", "None")
        make_subitem("Pepper", "Pepper", 0, "ingredient", "None")
        make_subitem("Roasted Peppers", "Rst Peppers", 0, "ingredient", "None")
        make_subitem("Pickled Red Onion", "Pickled Onion", 0, "ingredient", "None")
        make_subitem("Potato Puree", "Puree", 0, "ingredient", "None")
        make_subitem("Raddish", "Raddish", 0, "ingredient", "None")
        make_subitem("Salt", "Salt", 0, "ingredient", "None")
        make_subitem("Seasoning", "Seasoning", 0, "ingredient", "None")
        make_subitem("Shallot", "Shallot", 0, "ingredient", "None")
        make_subitem("Sunflower Seeds", "Seeds", 0, "ingredient", "None")
        make_subitem("Thyme", "Thyme", 0, "ingredient", "None")
        make_subitem("Tomato", "Tomato", 0, "ingredient", "None")
        make_subitem("Truffle", "Truffle", 0, "ingredient", "None")
        make_subitem("Pickle", "Pickle", 0, "ingredient", "None")
        make_subitem("Candle", "Candle", 0, "modifier", "sweets")
        make_subitem("Chopped", "Chopped", 0, "modifier", "salads")
        make_subitem("Condiments", "Condiments", 0, "modifier", "None")
        make_subitem("Crispy", "Crispy", 0, "modifier", "None")
        make_subitem("Dressing", "Dressing", 0, "modifier", "salads")
        make_subitem("Plain", "Plain", 0, "modifier", "None")
        make_subitem("Rare", "Rare", 0, "temperature", "None")
        make_subitem("Medium Rare", "Med Rare", 0, "temperature", "None")
        make_subitem("Medium", "Medium", 0, "temperature", "None")
        make_subitem("Medium Well", "Med Well", 0, "temperature", "None")
        make_subitem("Well Done", "Well", 0, "temperature", "None")
        
        db.session.add_all(sub_items)
        db.session.commit()

        # Item Mods

        scramble = ["Chives", "Creme Fraiche", "Butter", "Sourdough Toast", "Avocado", "Well Done"]
        make_item_mod("Scramble", scramble)
        
        bacon = ["Maple Glaze", "Pepper", "Crispy"]
        make_item_mod("Bacon", bacon)
        
        lox = ["Capers", "Sourdough Toast", "Pickled Red Onion", "Cream Cheese", "Herbs"]
        make_item_mod("Lox", lox)

        avo_toast = ["Balsamic Glaze", "Soft Boiled Egg", "Pickled Red Onion"]
        make_item_mod("Avocado Toast", avo_toast)

        prodel = ["Grapes", "Baguette", "Cheese", "Butter", "Jam", "Pepper"]
        make_item_mod("Prosciutto", prodel)
        make_item_mod("Delice", prodel)
        make_item_mod("Combo Board", prodel)

        shrimp = ["Lemon", "Cocktail Sauce", "Dijonnaise"]
        make_item_mod("Shrimp Cocktail", shrimp)

        chokes = ["Rosemary", "Rosemary Aioli", "Crispy"]
        make_item_mod("Artichokes", chokes)

        burrata = ["Balsamic Vinegar", "Roasted Peppers", "Parsley", "Sourdough Toast", "Salt", "Pepper"]
        make_item_mod("Burrata", burrata)

        gem = ["Avocado", "Feta", "Raddish", "Shallot", "Dressing"]
        make_item_mod("Gem", gem)

        arugula = ["Fennel", "Grapes", "Sunflower Seeds", "Shaved Parm", "Shallot", "Dressing"]
        make_item_mod("Arugula", arugula)

        veg = ["Pecans", "Raddish", "Beets", "Carrots", "Dressing"]
        make_item_mod("Shaved Veg", veg)
        
        caesar = ["Grated Parm", "Croutons", "Dressing"]
        make_item_mod("Caesar", caesar)

        burger = ["Cheese", "Plain", "Onion", "Pickle", "Dijonnaise", "Lettuce", "Tomato", "Burger Bun", "Avocado Add", "Bacon Add", "Condiments"]
        make_item_mod("RH Burger", burger)
        
        ribeye = ["Swiss", "Au Jus", "Cherry Pepper", "Baguette"]
        make_item_mod("Shaved Ribeye", ribeye)
        
        grcheese = ["Bacon Add", "Avocado Add", "Cherry Pepper", "Truffle"]
        make_item_mod("Grilled Cheese", grcheese)

        roll = ["Old Bay Seasoning", "Chives", "Mayonnaise", "Drawn Butter"]
        make_item_mod("Lobster Roll", roll)
        
        salmon = ["Lemon", "Honey", "Brown Butter", "Pepper", "Plain"]
        make_item_mod("Salmon", salmon)
        
        roti = ["Seasoning", "Potato Puree", "Garlic Confit"]
        make_item_mod("Roti", roti)
        
        steak = ["Seasoning", "Butter"]
        make_item_mod("Ribeye Steak", steak)
        
        ff = ["Ketchup", "Garlic Aioli", "Crispy"]
        make_item_mod("Fries", ff)
        
        tff = ["Shaved Parm", "Parsley", "Truffle", "Truffle Aioli"]
        make_item_mod("Truff Fries", tff)
        simple = ["Dressing", "Shallot", "Raddish"]
        make_item_mod("Simple Salad", simple)
        
        puree = ["Chive Butter"]
        make_item_mod("Puree", puree)

        broc = ["Chili Paste", "Lemon Zest", "Garlic Confit", "Plain"]
        make_item_mod("Broccolini", broc)

        mush = ["Garlic", "Thyme", "Plain", "Butter", "Chives"]
        make_item_mod("Mushrooms", mush)

        cookies = ["Salt", "Candle"]
        make_item_mod("Cookies", cookies)
        
        gelato = ["Candle"]
        make_item_mod("Van Gelato", gelato)
        make_item_mod("Choc Gelato", gelato)
        make_item_mod("Carm Gelato", gelato)
        make_item_mod("Rasp Sorb", gelato)

        db.session.add_all(item_mods)
        db.session.commit()

        # Fake User Data



        print("Seeding complete...")