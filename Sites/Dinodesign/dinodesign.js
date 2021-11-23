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
  window.location.href.indexOf("https://www.dinodesign.com") > -1 ||
  window.location.href.indexOf("https://dinodesign") > -1
) {
  if (window.location.href.indexOf("/shop/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}/page/${page}/`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".shop-container .image-fade_in_back a"
          );
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
              const title = $(bodyPath)
                .find(".product-info h1.product-title ")
                .text();

              const description = $(bodyPath).find("#tab-description ").html();
              let image = $(bodyPath).find(
                ".shop-container .product-thumbnails img"
              );
              let images = [];
              $(image).each(function (_, item) {
                images.push($(item).attr("src"));
              });

              let imageitem = $(bodyPath).find(
                ".shop-container .product-images img"
              );
              let imageThub = [];
              $(imageitem).each(function (_, item) {
                imageThub.push($(item).attr("src"));
              });
              let option1_name = "";
              let option2_name = "";
              let option3_name = "";
              let variants = [];
              // console.log($(bodyPath).find("label.label-tag"));
              if ($(bodyPath).find("label.label-tag").length > 1) {
                // console.log(title);
                option1_name = "Styles";
                option2_name = "Colors";
                option3_name = "Dimension";
                let Arr_styles = [];
                let stylesItem = $(bodyPath).find("#style_shirt_2d").length
                  ? $(bodyPath).find("#style_shirt_2d option")
                  : $(bodyPath).find("#style_yeezy_pgcom option");
                $(stylesItem).each(function (_, item) {
                  Arr_styles.push($(item).attr("value"));
                });
                let Arr_stylesPrice = [];
                let stylesItemPrice = $(bodyPath).find("#style_shirt_2d").length
                  ? $(bodyPath).find("#style_shirt_2d option")
                  : $(bodyPath).find("#style_yeezy_pgcom option");
                $(stylesItemPrice).each(function (_, item) {
                  let arr = [];
                  arr.push($(item).attr("value"));
                  arr.push($(item).attr("data-price"));
                  Arr_stylesPrice.push(arr);
                });
                // console.log(Arr_stylesPrice);

                let Arr_size = [];
                let sizeItem = $(bodyPath).find("#size_shirt_2d_s_5xl").length
                  ? $(bodyPath).find("#size_shirt_2d_s_5xl option")
                  : $(bodyPath).find("#men_size_yeezy_pgcom option");
                $(sizeItem).each(function (_, item) {
                  Arr_size.push($(item).attr("value"));
                });
                let Arr_sizePrice = [];
                let sizeItemPrice = $(bodyPath).find("#size_shirt_2d_s_5xl")
                  .length
                  ? $(bodyPath).find("#size_shirt_2d_s_5xl option")
                  : $(bodyPath).find("#men_size_yeezy_pgcom option");

                $(sizeItemPrice).each(function (_, item) {
                  let arr = [];
                  arr.push($(item).attr("value"));
                  arr.push($(item).attr("data-price"));
                  Arr_sizePrice.push(arr);
                });
                let Arr_colors = [];
                let colorsItem = $(bodyPath).find("#color_popular_tee_unisex")
                  .length
                  ? $(bodyPath).find("#color_popular_tee_unisex option")
                  : $(bodyPath).find("#color_yeezy_pgcom option");
                $(colorsItem).each(function (_, item) {
                  Arr_colors.push($(item).attr("value"));
                });
                const priceText = bodyPath.match(/"offers":\[(.*?)}}/);
                let priceJon = JSON.parse(`${priceText[1]}}}`);
                let price = priceJon.price;
                for (const itemstyle of Arr_styles) {
                  let priceSale = CheckPriceSale(
                    price,
                    itemstyle,
                    Arr_stylesPrice
                  );
                  const itemVariant = {
                    option1: itemstyle,
                    price: 0,
                    origin_price: true,
                  };

                  // variants.push(itemVariant2);
                  for (const itemcolor of Arr_colors) {
                    const itemVariant2 = {
                      ...itemVariant,
                      option2: itemcolor,
                    };
                    for (const itemsize of Arr_size) {
                      const itemVariant3 = {
                        ...itemVariant2,
                        option3: itemsize,
                        price:
                          checkPriceDino(itemsize, priceSale, Arr_sizePrice) -
                          2,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      variants.push(itemVariant3);
                    }
                  }
                  // console.log(variants);
                }
              } else {
                let price = $(bodyPath)
                  .find(".price-on-sale ins .woocommerce-Price-amount ")
                  .text();
                // console.log(price);
                let priceSale = price.replace("$", "");
                const itemVariant = {
                  price: priceSale - 2,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                variants.push(itemVariant);
                // console.log(variants);
              }
              let listCate = ["OTHERS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["paypal"] = 0;
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "dinodesign";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images.length > 0 ? images : imageThub;
              product["variants"] = variants;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "";
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
              send(product, "dinodesign");
              break;
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
function CheckPriceSale(price, id, arr) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let priceN;
      if (arr[i][1] === undefined) {
        priceN = price;
      } else {
        priceN = Number(price) + parseInt(arr[i][1]);
      }
      return priceN;
    }
  }
}
function checkPriceDino(id, price, var_price) {
  let priceN;
  for (let i = 0; i <= var_price.length - 1; i++) {
    if (id === var_price[i][0]) {
      if (var_price[i][1] === undefined) {
        priceN = price;
      } else {
        priceN = Number(price) + parseInt(var_price[i][1]);
      }
      return priceN;
    }
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
