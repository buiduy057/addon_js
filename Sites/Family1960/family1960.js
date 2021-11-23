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
    url: "https://api.winterluckpod.com/admin/product/create-tool",
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
console.log("vao");
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("http://www.family1960.com") > -1 ||
  window.location.href.indexOf("http://family1960.com/") > -1
) {
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
        const productItem = $(body).find(".site-content .col-md-3  a");
        // console.log(productItem);
        $(productItem).each(function (_, item) {
          urlProducts.push($(item).attr("href"));
        });
        // console.log(urlProducts);
        const urlsUnique = [...new Set(urlProducts)];

        for (const path of urlsUnique) {
          try {
            // console.log(path);

            const rqPath = await fetch(path);
            const bodyPath = await rqPath.text();
            const variants = bodyPath.match(/","mockups":(.*?)}],/);
            const variantJson = JSON.parse(variants[1] + "}]");
            // console.log(variantJson);
            const title = $(bodyPath)
              .find(".col-lg-5 .selected-campaign-mockup-title")
              .text();
            const description = $(bodyPath)
              .find(".campaign-description-inner")
              .html();
            const images_arr = [];
            let images = $(bodyPath)
              .find(".col-lg-7 .big-shoe img")
              .attr("src");
            images_arr.push(images);

            const imagesThub_arr = [];
            let imagesThub = $(bodyPath).find(
              ".col-sm-12.hidden-xs   .thumb-row img"
            );
            $(imagesThub).each(function (_, item) {
              const Item = $(item).attr("src");
              const ItemN = Item.slice(0, Item.indexOf("width") - 1);
              imagesThub_arr.push(ItemN);
            });
            let variants_arr = [];
            if (variantJson.length > 2) {
              for (const size of variantJson) {
                const itemVariant = {
                  option1: size.mockup_title,
                  price: size.retail_price - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants_arr.push(itemVariant);
              }
              let listCate = ["BEDDING SET & BLANKET"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "winterluckpod.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "family1960";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] =
                imagesThub_arr.length > 0 ? imagesThub_arr : images_arr;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "T-Shirts";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = "Dimension";
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "family1960");
            } else if (variantJson.length === 2) {
              for (const size of variantJson) {
                const itemVariant = {
                  option1: size.mockup_title,
                  price: size.retail_price - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants_arr.push(itemVariant);
              }

              let listCate = ["BAGS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "winterluckpod.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "family1960";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] =
                imagesThub_arr.length > 0 ? imagesThub_arr : images_arr;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "Bags";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = "Dimension";
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "family1960");
            }
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
function CheckPriceKi(a, b) {
  if (a === b) {
    return Number(a);
  } else {
    return Number(a);
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
