var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
});
// chrome.storage.local.get("data", function (items) {
//   console.log(items);
// });
// chrome.storage.local.clear();
let data;

chrome.storage.local.get("data", function (item) {
  data = item;
});
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === "start") {
    document.location.reload();
  }
});

// FUNCTION
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function get(name) {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
}

function send(item, vender) {
  console.log(item);
  $.ajax({
    url: "https://api.zonesofblack.net/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
    },
  });
}

function send_update(atokproduct_id) {
  $.ajax({
    url: "https://asyourprint.sale/admin/product/update-tool",
    type: "post",
    dataType: "text",
    data: {
      atokproduct_id: atokproduct_id,
    },
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
    },
  });
}
function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

$(window).ready(function () {
  if (Object.keys(data).length > 0) {
    let title = data.data[0];
    let images = data.data[1];
    let description =
      "100% Cotton Fabric.\nClassic, loose Fit**FREE SHIPPING WORLDWIDE**\n**NOT SOLD IN STORES**\n* This is a made-to-order item. It is printed in and shipped from the US to anywhere in the world, just for your order!\nThe printing process starts as soon as your order is placed and it may take 3-5 business days for shipment to begin. Please contact us if you have a specific deadline and thank you for your patience!\n* Treat yourself or make a great gift for your loved ones.\n* This Limited Edition shirt will only be available until our campaign ends, so don’t miss out and order yours now!";
    let option1_name = "Product";
    let option2_name = "Color";
    let option3_name = "Size";
    let product = ["Fleece Blanket", "Sherpa Fleece Blanket"];
    let color = [
      "Black",
      "Sports Grey",
      "Navy",
      "Royal Blue",
      "Ash",
      "Carolina Blue",
      "Forest Green",
      "Dark Chocolate",
      "Orange",
      "Purple",
      "Red",
    ];
    let size = [
      "Small Fleece Blanket - 30 X 40",
      "Fleece Blanket - 50 X 60",
      "Large Fleece Blanket - 60 X 80",
    ];
    let tags = "";
    let variants = [];
    product.forEach(function (product, product_key) {
      color.forEach(function (color, color_key) {
        size.forEach(function (size, size_key) {
          if (images != null) option1_picture = 1;
          if (product === "Fleece Blanket") {
            variant = {
              sku: "sku-" + product_key,
              var_images: images,
              option1: product,
              option2: color,
              option3: size,
              origin_price: true,
              price: 42.95,
              cost: 37.3,
              shipping_cost: 0,
              quantity: 9999,
            };
          } else {
            variant = {
              sku: "sku-" + product_key,
              var_images: images,
              option1: product,
              option2: color,
              option3: size,
              origin_price: true,
              price: 56.95,
              cost: 49,
              shipping_cost: 0,
              quantity: 9999,
            };
          }
          variants.push(variant);
        });
      });
    });
    listCate = [];
    product = {};
    let listCate = ["BLANKETS"];
    tit = title + " " + makeid(10);
    product["domain"] = "customray.com";
    product["title"] = title;
    product["categories"] = listCate;
    product["google_category"] = ggcate;
    product["gender"] = "All";
    product["vender"] = "customray";
    product["vender_url"] = window.location.href;
    product["description"] = description;
    product["images"] = images;
    product["variants"] = variants;
    product["designed"] = -1;
    product["trending"] = trending === true ? 1 : 0;
    product["feedback"] = null;
    product["tags"] = tags;
    product["rank"] = null;
    product["vender_id"] = data.id;
    product["specifics"] = null;
    product["option1_name"] = option1_name;
    product["option2_name"] = option2_name;
    product["option3_name"] = option3_name;
    product["option1_picture"] = option1_picture;
    product["delivery_date_min"] = 5;
    product["delivery_date_max"] = 20;
    product["shipping_service_name"] = "Economy Shipping";
    product["location"] = "USA";
    console.log(JSON.stringify(product));
    // send(product, "customray");
    chrome.storage.local.clear();
  }
});

function timeout(ms = 10000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
