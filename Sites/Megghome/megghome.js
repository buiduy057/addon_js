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
  window.location.href.indexOf("https://www.megghome.com") > -1 ||
  window.location.href.indexOf("https://megghome.com") > -1
) {
  $(window).ready(function () {
    // console.log("vao");

    var url_string = window.location.href;
    async function getPage(page = 2) {
      try {
        let urlProducts = [];
        console.log(`page=${page}`);
        const urlRequest = `${url_string}?page=${page}`;
        const rq = await fetch(urlRequest);
        const body = await rq.text();
        const productItem = $(body).find(
          "#CollectionSection .grid-product__image-wrapper a"
        );
        $(productItem).each(function (_, item) {
          urlProducts.push($(item).attr("href"));
        });
        // console.log(urlProducts);
        const urlsUnique = [...new Set(urlProducts)];
        // console.log(data);

        for (const path of urlsUnique) {
          try {
            const urlProduct = `https://www.megghome.com/${path}`;

            const productJson = await fetch(`${urlProduct}.js`);
            const data = await productJson.json();
            // console.log(data);
            let title = data.title;

            let images = data.images;
            let tags = data.tags.toString();
            const option1_name = data.options[0].name;
            const option2_name = data.options[1].name;
            let variants_arr = [];
            for (const item of data.variants) {
              const itemVariant = {
                option1: item.option1,
                option2: item.option2,
                var_images: CheckImagesTeeholic(item.featured_image.src),
                price: item.price / 100,
                cost: item.price / 100 - 2,
                origin_price: true,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants_arr.push(itemVariant);
            }
            // console.log(variants_arr);
            let listCate = ["DOORMATS"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = "customray.com";
            product["title"] = title + " " + makeid(10);
            product["categories"] = listCate;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = "megghome";
            product["vender_url"] = urlProduct;
            product["description"] = "";
            product["images"] = images;
            product["variants"] = variants_arr;
            product["designed"] = -1;
            product["trending"] = trending === true ? 1 : 0;
            product["feedback"] = null;
            product["tags"] = tags;
            product["rank"] = null;
            product["vender_id"] = data.url;
            product["specifics"] = null;
            product["option1_name"] = option1_name;
            product["option2_name"] = option2_name;
            product["option1_picture"] = 0;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            // console.log(JSON.stringify(product));
            send(product, "megghome");

            // console.log(variants_arr);
            // break;
          } catch (e) {
            console.error(e);
          } finally {
            await timeOut(800);
          }
        }
      } catch (e) {
        console.error(e);
      }
      getPage(++page);
    }
    getPage();
  });
}
function CheckImagesTeeholic(img) {
  let var_img = [];
  var_img.push(img);
  return var_img;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
