var designed = false;
chrome.storage.local.get("designed", function (items) {
  designed = items.designed;
});

var trending = false;
chrome.storage.local.get("trending", function (items) {
  trending = items.trending;
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
  // console.log(item);
  $.ajax({
    url: "https://api.customray.com/admin/product/create-tool",
    type: "post",
    dataType: "text",
    data: {
      item: JSON.stringify(item),
    },

    vender: vender,
    success: function (data) {
      console.log(data);
      // console.log(this.next);
      // window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      // window.close();
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
      // window.close();
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
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  getPage();
});
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.jofeeshop.com") > -1 ||
  window.location.href.indexOf("https://jofeeshop.com") > -1
) {
  var url_string = window.location.href;
  if (window.location.href.indexOf(`/products/`) > -1) {
    fetch(
      `https://api.shopbase.com/v1/recsys/get-up-sell-products/v3/10099843?product_id=1000000144671583&contact_ref_id=1615276456265_4432&source=pre-purchase&v=1615276637323&setting=same_collection_target_products&total_product=4`
    )
      .then((response) => response.json())
      .then((response) => {
        const data = response.products[0];
        const title = data.title;
        const description = data.description;
        let option1_name = data.options[0].label;
        let tags = "Quit Blankets";
        let images_arr = [];
        for (const item of data.images) {
          images_arr.push(item.src);
        }
        let i = 1;
        let variantsItems = [];
        for (const item of data.variants) {
          const variant = {
            sku: `Jofeeshop_${i}`,
            option1: item.title,
            price: item.price,
            shipping_cost: 0,
            quantity: 9999,
            origin_price: true,
          };
          variantsItems.push(variant);
          i++;
        }
        // console.log(variantsItems);
        let listCate = ["CUSTOMIZE NFL QUILT"];
        tit = title + " " + makeid(10);
        product = {};
        ggcate = filterCategory(tit);
        product["domain"] = `badoshoes.com`;
        product["title"] = title + " " + makeid(10);
        product["categories"] = listCate;
        product["paybal"] = 1;
        product["google_category"] = ggcate;
        product["gender"] = "All";
        product["vender"] = `badoshoes_jofeeshop`;
        product["vender_url"] = url_string;
        product["description"] = description;
        product["images"] = images_arr;
        product["variants"] = variantsItems;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["vender_id"] = url_string;
        product["specifics"] = null;
        product["option1_picture"] = 0;
        product["option1_name"] = option1_name;
        product["delivery_date_min"] = 5;
        product["delivery_date_max"] = 20;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        // console.log(JSON.stringify(product));
        send(product, `badoshoes_jofeeshop`);
      });
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
