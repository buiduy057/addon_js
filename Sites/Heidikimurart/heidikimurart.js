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
  window.location.href.indexOf("https://www.heidikimurart.com") > -1 ||
  window.location.href.indexOf("https://heidikimurart") > -1
) {
  if (window.location.href.indexOf("/collections/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}?page=${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            "#shopify-section-collection-template .grid__item a"
          );
          // console.log(productItem);
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });

          const urlsUnique = [...new Set(urlProducts)];
          // console.log(urlsUnique);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const requestPath = `${path}.js`;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.json();
              // console.log(bodyPath);
              const title = bodyPath.title;
              const description = bodyPath.description;
              const tags = bodyPath.tags.toString();
              let imageitem = bodyPath.images;
              // console.log(imageitem);
              let option1_name = bodyPath.options[0].name;
              let option2_name =
                bodyPath.options[1] !== undefined
                  ? bodyPath.options[1].name
                  : "";
              let option3_name =
                bodyPath.options[2] !== undefined
                  ? bodyPath.options[2].name
                  : "";
              let datavariant = bodyPath.variants;
              let variants_arr = [];
              for (const item of datavariant) {
                const itemVariant = {
                  option1: item.option1,
                  option2: item.option2 !== null ? item.option2 : "",
                  option3: item.option3 !== null ? item.option3 : "",
                  price: item.price / 100 - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants_arr.push(itemVariant);
              }
              // console.log(variants_arr);
              let listCate = ["OTHERS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "heidikimurart";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = imageitem;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tags;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option2_name"] = option2_name;
              product["option3_name"] = option3_name;
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "heidikimurart");
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
}

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
