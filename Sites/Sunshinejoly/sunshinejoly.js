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
    url: "https://api.teearechill.com/admin/product/create-tool",
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
  window.location.href.indexOf("https://www.sunshinejoly.com") > -1 ||
  window.location.href.indexOf("https://sunshinejoly.com") > -1
) {
  var url_string = window.location.href;
  const category = url_string.slice(url_string.indexOf("/"), url_string.length);
  if (window.location.href.indexOf(`com`) > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".mb-7 .p-4  a");
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const variantsPath = bodyPath.match(/var pjson = (.*?);/);
              const dataVarr = JSON.parse(variantsPath[1]);
              // console.log(dataVarr);
              const title = $(bodyPath).find("h1.title-font").text();
              let images_arr = [];
              let imageitem = $(bodyPath).find("img.thumb-img");
              images_arr.push(imageitem);
              let variantsItems = [];
              let i = 1;
              let option1_name = dataVarr.options[0];
              let option2_name =
                dataVarr.options[1] !== undefined ? dataVarr.options[1] : "";
              let option3_name =
                dataVarr.options[2] !== undefined ? dataVarr.options[2] : "";
              for (const item of dataVarr.variants) {
                const variant = {
                  sku: `Sunshinejoly_${i}`,
                  option1: item.options[0],
                  option2: item.options[1] !== undefined ? item.options[1] : "",
                  option3: item.options[2] !== undefined ? item.options[2] : "",
                  var_images: [item.img],
                  price: item.price - 1,
                  shipping_cost: 0,
                  quantity: 9999,
                  origin_price: true,
                };
                variantsItems.push(variant);
                i++;
              }
              // console.log(variantsItems);
              let listCate = ["SHIRTS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = `bizu.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `bizu_sunshinejoly`;
              product["vender_url"] = path;
              product["description"] = "";
              product["images"] = variantsItems[0].var_images;
              product["variants"] = variantsItems;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "Shirts";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = 0;
              product["option1_name"] = option1_name;
              product["option2_name"] = option2_name;
              product["option3_name"] = option3_name;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `bizu_sunshinejoly`);
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

        // getPage(++page);
      }
      getPage();
    });
  }
}
function CheckOptionColor(item) {
  const ItemChat = item.charAt(0).toUpperCase() + item.slice(1);
  return ItemChat;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
