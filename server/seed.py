#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Item, SubItem, Check, Order, Modifier

menu_items = []
sub_items = []

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

def make_subitem(name, button, price, category):
    subitem = SubItem(
        name = name,
        button_name = button,
        price = price,
        category = category
    )

    sub_items.append(subitem)

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


        # Sub Items
        


        # Fake User Data


        db.session.add_all(menu_items)
        db.session.commit()

        print("Seeding complete...")