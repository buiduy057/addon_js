console.log("hello hihi");
function request(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then(resolve)
      .catch(reject);
  });
}
function simpleRequest(url, method = "GET", data = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method: method,
      };

      if (method === "POST") {
        const formData = new FormData();
        for (const key in data) {
          formData.append(key, data[key]);
        }
        options.body = formData;
      }
      console.log(url, options);

      const response = await fetch(url, options);
      const responseJson = await response.json();
      resolve(responseJson);
    } catch (e) {
      reject(e);
    }
  });
}

function filterCategory(titleitem) {
  // console.log(titleitem);
  let ggcate = "Apparel & Accessories";
  if (
    titleitem.indexOf("Anthony") != -1 ||
    titleitem.indexOf("M.a-s.k") != -1 ||
    titleitem.indexOf("Carbon") != -1 ||
    titleitem.indexOf("Layers") != -1 ||
    titleitem.indexOf("Bandana") != -1 ||
    titleitem.indexOf("Mask") != -1
  ) {
    ggcate = "Apparel & Accessories > Costumes & Accessories > Masks";
  } else if (
    titleitem.indexOf("FRAMED ART PRINTS") != -1 ||
    titleitem.indexOf("Framed Art Prints") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("DOORMATS") != -1 ||
    titleitem.indexOf("Doormats") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("FACE MASK") != -1 ||
    titleitem.indexOf("Face Mask") != -1 ||
    titleitem.indexOf("face Mask") != -1
  ) {
    ggcate = "Apparel & Accessories > Costumes & Accessories > Masks";
  } else if (
    titleitem.indexOf("ART PRINT") != -1 ||
    titleitem.indexOf("Art Print") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("QUILT BED SETS") != -1 ||
    titleitem.indexOf("Quilt Bed Sets") != -1 ||
    titleitem.indexOf("HUNTING") != -1 ||
    titleitem.indexOf("Hunting") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Activewear > Hunting Clothing";
  } else if (
    titleitem.indexOf("THROW PILLOW") != -1 ||
    titleitem.indexOf("Throw Pillow") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("MUGS") != -1 ||
    titleitem.indexOf("Mug") != -1 ||
    titleitem.indexOf("Mugs") != -1
  ) {
    ggcate = "Home & Garden > Kitchen & Dining > Tableware > Drinkware > Mugs";
  } else if (
    titleitem.indexOf("HOLIDAY") != -1 ||
    titleitem.indexOf("Holiday") != -1
  ) {
    ggcate = "Home & Garden > Decor > Seasonal & Holiday Decorations";
  } else if (
    titleitem.indexOf("SOCKS") != -1 ||
    titleitem.indexOf("Socks") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Underwear & Socks > Socks";
  } else if (
    titleitem.indexOf("PHONE CASE") != -1 ||
    titleitem.indexOf("Phone Case") != -1
  ) {
    ggcate =
      "Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Cases";
  } else if (
    titleitem.indexOf("CANVAS") != -1 ||
    titleitem.indexOf("Canvas") != -1
  ) {
    ggcate =
      "Arts & Entertainment > Hobbies & Creative Arts > Arts & Crafts > Art & Crafting Materials > Textiles > Crafting Canvas";
  } else if (titleitem.indexOf("BAG") != -1 || titleitem.indexOf("Bag") != -1) {
    ggcate = "Luggage & Bags";
  } else if (
    titleitem.indexOf("BACKPACK") != -1 ||
    titleitem.indexOf("Backpack") != -1
  ) {
    ggcate = "Luggage & Bags > Backpacks";
  } else if (
    titleitem.indexOf("V-Necks") != -1 ||
    titleitem.indexOf("V-NECKS") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing";
  } else if (
    titleitem.indexOf("TOTES") != -1 ||
    titleitem.indexOf("Totes") != -1 ||
    titleitem.indexOf("TOTE") != -1
  ) {
    ggcate = "Luggage & Bags > Shopping Totes";
  } else if (
    titleitem.indexOf("HALLOWEEN") != -1 ||
    titleitem.indexOf("Halloween") != -1 ||
    titleitem.indexOf("LEAGUE OF LEGENDS") != -1 ||
    titleitem.indexOf("League of legends") != -1 ||
    titleitem.indexOf("SPORTS") != -1 ||
    titleitem.indexOf("Sports") != -1 ||
    titleitem.indexOf("TRENDING") != -1 ||
    titleitem.indexOf("Trending") != -1 ||
    titleitem.indexOf("VIKING") != -1 ||
    titleitem.indexOf("Viking") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("CATS") != -1 ||
    titleitem.indexOf("Cats") != -1 ||
    titleitem.indexOf("BEST SELLING") != -1 ||
    titleitem.indexOf("Best Selling ") != -1 ||
    titleitem.indexOf("OTHERS") != -1 ||
    titleitem.indexOf("Others ") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("SHOES") != -1 ||
    titleitem.indexOf("Shoes") != -1
  ) {
    ggcate = "Apparel & Accessories > Shoes";
  } else if (
    titleitem.indexOf("PANTS") != -1 ||
    titleitem.indexOf("Pants") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Pants";
  } else if (
    titleitem.indexOf("BAGS") != -1 ||
    titleitem.indexOf("Bags") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Blankets";
  } else if (
    titleitem.indexOf("BLANKETS") != -1 ||
    titleitem.indexOf("Blankets") != -1 ||
    titleitem.indexOf("CUSTOMIZE NFL QUILT") != -1 ||
    titleitem.indexOf("Customize Nft Quilt") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Blankets";
  } else if (
    titleitem.indexOf("BEDDING SET & BLANKET") != -1 ||
    titleitem.indexOf("Bedding Set &  Blanket") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Blankets";
  } else if (
    titleitem.indexOf("APPAREL") != -1 ||
    titleitem.indexOf("Apparel") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing";
  } else if (
    titleitem.indexOf("CAMPING") != -1 ||
    titleitem.indexOf("Camping") != -1
  ) {
    ggcate = "Sporting Goods > Outdoor Recreation > Camping & Hiking";
  } else if (
    titleitem.indexOf("BEDDING SET COLLECTION") != -1 ||
    titleitem.indexOf("Bedding Set Collection") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Blankets";
  } else if (
    titleitem.indexOf("T-SHIRTS") != -1 ||
    titleitem.indexOf("SHIRTS") != -1 ||
    titleitem.indexOf("Shirts") != -1 ||
    titleitem.indexOf("T-Shirts") != -1 ||
    titleitem.indexOf("HOT PATRICKS DAY") != -1 ||
    titleitem.indexOf("Hot Patrick's Day") != -1 ||
    titleitem.indexOf("HOODIE") != -1 ||
    titleitem.indexOf("Hoodie") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Shirts & Tops";
  } else if (
    titleitem.indexOf("PHONE CASES") != -1 ||
    titleitem.indexOf("Phone Cases") != -1
  ) {
    ggcate =
      "Electronics > Communications > Telephony > Mobile Phone Accessories > Mobile Phone Cases";
  } else if (titleitem.indexOf("RUG") != -1 || titleitem.indexOf("Rug") != -1) {
    ggcate = "Home & Garden > Clothing & Bedding & Quit";
  } else if (
    titleitem.indexOf("QUILT & BLANKET") != -1 ||
    titleitem.indexOf("Quilt & Blanket") != -1
  ) {
    ggcate = "Home & Garden > Clothing & Bedding & Quit";
  } else if (
    titleitem.indexOf("Flag") != -1 ||
    titleitem.indexOf("FLAG") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Pillows";
  } else if (
    titleitem.indexOf("Decor Lamp") != -1 ||
    titleitem.indexOf("DECOR LAMP") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("BACK CAR") != -1 ||
    titleitem.indexOf("Back Car") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("TRENDING") != -1 ||
    titleitem.indexOf("Trending") != -1
  ) {
    ggcate = "Apparel & Accessories";
  } else if (
    titleitem.indexOf("CHARM") != -1 ||
    titleitem.indexOf("Charm") != -1 ||
    titleitem.indexOf("Ornament") != -1
  ) {
    ggcate = "Apparel & Accessories > Jewelry > Charms & Pendants";
  } else if (
    titleitem.indexOf("DOOR MAT") != -1 ||
    titleitem.indexOf("Door Mat") != -1
  ) {
    ggcate = "Home & Garden > Decor > Door Mats";
  } else if (
    titleitem.indexOf("WATCH") != -1 ||
    titleitem.indexOf("Watch") != -1
  ) {
    ggcate = "Apparel & Accessories > Jewelry > Watches";
  } else if (
    titleitem.indexOf("BANGLE") != -1 ||
    titleitem.indexOf("Bangle") != -1
  ) {
    ggcate = "Apparel & Accessories > Jewelry";
  } else if (titleitem.indexOf("Shorts") != -1) {
    ggcate = "Apparel & Accessories > Clothing > Shorts";
  } else if (
    titleitem.indexOf("Hoodie") != -1 ||
    titleitem.indexOf("Hoodies") != -1 ||
    titleitem.indexOf("HOODIES") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Outerwear";
  } else if (titleitem.indexOf("Dress") != -1) {
    ggcate = "Apparel & Accessories > Clothing > Dresses";
  } else if (titleitem.indexOf("Quilt") != -1) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Quilts & Comforters";
  } else if (titleitem.indexOf("Blanket") != -1) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Blanket";
  } else if (
    titleitem.indexOf("Hats") != -1 ||
    titleitem.indexOf("HATS") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing Accessories > Hats";
  } else if (
    titleitem.indexOf("Tumblers") != -1 ||
    titleitem.indexOf("TUMBLERS") != -1
  ) {
    ggcate =
      "Home & Garden > Kitchen & Dining > Tableware > Drinkware > Tumblers";
  } else if (titleitem.indexOf("DRESS") != -1) {
    ggcate = "Apparel & Accessories > Clothing > Dresses";
  } else if (titleitem.indexOf("Clothes") != -1) {
    ggcate = "Apparel & Accessories > Clothing > Shirts & Tops";
  } else if (titleitem.indexOf("LEGGINGS") != -1) {
    ggcate = "Apparel & Accessories > Clothing";
  } else if (
    titleitem.indexOf("FAMILY") != -1 ||
    titleitem.indexOf("Family") != -1 ||
    titleitem.indexOf("FIREFIGHTER") != -1 ||
    titleitem.indexOf("Firefighter") != -1 ||
    titleitem.indexOf("KNIGHT TEMPLAR") != -1 ||
    titleitem.indexOf("Knight Templar") != -1 ||
    titleitem.indexOf("SOLDIER") != -1 ||
    titleitem.indexOf("Soldier") != -1 ||
    titleitem.indexOf("SAMURAI") != -1 ||
    titleitem.indexOf("Samurai") != -1 ||
    titleitem.indexOf("SPARTAN") != -1 ||
    titleitem.indexOf("Spartan") != -1
  ) {
    ggcate = "Apparel & Accessories > Shoes";
  } else if (
    titleitem.indexOf("BIKER") != -1 ||
    titleitem.indexOf("Biker") != -1
  ) {
    ggcate = "Apparel & Accessories > Shoes";
  } else if (
    titleitem.indexOf("Sneaker") != -1 ||
    titleitem.indexOf("Shoes") != -1 ||
    titleitem.indexOf("SHOES") != -1 ||
    titleitem.indexOf("BOOTS") != -1 ||
    titleitem.indexOf("SNEAKER") != -1
  ) {
    ggcate = "Apparel & Accessories > Shoes";
  } else if (
    titleitem.indexOf("Shirt") != -1 ||
    titleitem.indexOf("SHIRT") != -1 ||
    titleitem.indexOf("T-SHIRT") != -1 ||
    titleitem.indexOf("T-Shirt") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Shirts & Tops";
  } else if (
    titleitem.indexOf("Throw Pillow") != -1 ||
    titleitem.indexOf("THROW PILLOW") != -1
  ) {
    ggcate = "Home & Garden > Decor > Throw Pillows";
  } else if (
    titleitem.indexOf("Rugs") != -1 ||
    titleitem.indexOf("Rug") != -1
  ) {
    ggcate = "Apparel & Accessories > Clothing > Shirts & Tops";
  } else if (
    titleitem.indexOf("Bedding Set") != -1 ||
    titleitem.indexOf("BEDDING SET") != -1
  ) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding";
  } else if (titleitem.indexOf("Tablecloth") != -1) {
    ggcate =
      "Home & Garden > Kitchen & Dining > Tableware > Tablecloth Clips & Weights";
  } else if (
    titleitem.indexOf("Seat Cover") != -1 ||
    titleitem.indexOf("Seat Covers") != -1 ||
    titleitem.indexOf("CAR SEAT") != -1
  ) {
    ggcate =
      "Sporting Goods > Outdoor Recreation > Cycling > Bicycle Accessories > Bicycle Saddle Pads & Seat Covers";
  } else if (titleitem.indexOf("Pillow Cover") != -1) {
    ggcate = "Home & Garden > Linens & Bedding > Bedding > Pillows";
  } else if (titleitem.indexOf("Shades") != -1) {
    ggcate =
      "Home & Garden > Lawn & Garden > Outdoor Living > Outdoor Umbrellas & Sunshades";
  } else {
    return "Apparel & Accessories > Clothing > Shirts & Tops";
  }
  // console.log(ggcate);
  return ggcate;
}
