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
  window.location.href.indexOf("https://www.teeshirtpalace.com") > -1 ||
  window.location.href.indexOf("https://teeshirtpalace.com") > -1
) {
  var url_string = window.location.href;
  const category = url_string.slice(url_string.indexOf("/"), url_string.length);
  if (window.location.href.indexOf(`${category}`) > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}?sort=trending&page=${page}/`;

          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".col-md-10 .card-img-top");
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).children().eq(6).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath)
                .find(".product-info-box__product-name")
                .text();
              let images_arr = [];
              let imageitem = $(bodyPath).find("#frontImage");
              $(imageitem).each(function (_, item) {
                const Item = $(item).attr("src");
                images_arr.push(Item);
              });
              const price = $(bodyPath).find("#price-shown").text();
              const description = $(bodyPath).find("#product-details").html();
              const color_arr = [];
              const color = $(bodyPath).find(
                ".custom-checkbox-color-palette__inner .custom-checkbox"
              );
              $(color).each(function (_, item) {
                const Item = $(item).find("input").attr("data-name");
                const hex = $(item).find("input").attr("data-color");
                const Hex = hex.replace("#", "");
                const img = $(item).find("label").attr("data-productimage");
                const itemv = {
                  name: Item,
                  image: img,
                };
                color_arr.push(itemv);
              });
              // console.log(color_arr);
              const size_arr = [];
              const size = $(bodyPath).find(
                ".product-info-fixed-row__select-size option"
              );
              $(size).each(function (_, item) {
                const price = $(item).attr("data-price");
                if (price !== undefined) {
                  const Item = $(item).text();
                  const itemv = {
                    name: Item,
                    price: price,
                  };
                  size_arr.push(itemv);
                }
              });
              let i = 0;
              const variantsItems = [];
              for (const item of color_arr) {
                const variant = {
                  sku: `Teeshirtpalace_${i}`,
                  option1: CheckOptionColor(item.name),
                  var_images: [item.image],
                  shipping_cost: 0,
                  quantity: 9999,
                  origin_price: true,
                };
                if (size_arr.length) {
                  for (const size of size_arr) {
                    const variant1 = {
                      ...variant,
                      option2: size.name,
                      price: size.price - 1,
                    };
                    i++;
                    variantsItems.push(variant1);
                  }
                } else {
                  const variant1 = {
                    ...variant,
                    price: Number(price) - 1,
                    sku: `Teeshirtpalace_${i}`,
                  };
                  variantsItems.push(variant1);
                  i++;
                }
              }
              //HOODIES page = 16
              //WOMEN'S T-SHIRTS page = 13
              // console.log(variantsItems);
              let listCate = ["MENS", "BASEBALL SLEEVE SHIRTS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = `buzu.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `buzu_teeshirtpalace`;
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images_arr;
              product["variants"] = variantsItems;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "Mens";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = 0;
              product["option1_name"] = "Colors";
              product["option2_name"] = "Sizes";
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `buzu_teeshirtpalace`);
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
function CheckOptionColor(item) {
  const ItemChat = item.charAt(0).toUpperCase() + item.slice(1);
  return ItemChat;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
