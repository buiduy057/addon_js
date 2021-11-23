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
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.kingteeshops.com") > -1 ||
  window.location.href.indexOf("https://kingteeshops.com") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 6) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".shop-container .image-fade_in_back  a"
          );
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
              const title = $(bodyPath)
                .find(".product-info h1.product-title ")
                .text();
              const description = $(bodyPath).find("#tab-description").html();
              // // console.log(dataVariant);
              const images_arr = [];
              let images = $(bodyPath)
                .find(".large-6 .woocommerce-product-gallery__wrapper a")
                .attr("href");
              images_arr.push(images);

              const imagesThub_arr = [];
              let imagesThub = $(bodyPath).find(
                ".large-6 .product-thumbnails img"
              );
              $(imagesThub).each(function (_, item) {
                const Item = $(item).attr("src");
                const ItemN = Item.replace("247x296", "510x510");
                imagesThub_arr.push(ItemN);
              });

              const classTest = $(bodyPath).find(".wc-pao-addon-container");
              let linkForm = $(bodyPath).find("form.cart").attr("action");
              // console.log(classTest);
              if (classTest.length > 0) {
                const type_arr = [];
                const Item01 = $(bodyPath)
                  .find("form.cart")
                  .children()
                  .eq(0)
                  .find("select option");
                $(Item01).each(function (_, item) {
                  const Item = $(item).attr("data-label");
                  if ($(item).attr("data-label") !== undefined) {
                    if (Item.indexOf("Mug") === -1) {
                      type_arr.push($(item).attr("data-label"));
                    }
                  }
                });
                const size_arr = [];
                const Item02 = $(bodyPath)
                  .find("form.cart")
                  .children()
                  .eq(1)
                  .find("select option");
                $(Item02).each(function (_, item) {
                  const Item = $(item).attr("data-label");
                  if ($(item).attr("data-label") !== undefined) {
                    if (Item.indexOf("(Mug)") === -1) {
                      size_arr.push($(item).attr("data-label"));
                    }
                  }
                });
                // console.log(size_arr);
                const color_arr = [];
                const Item03 = $(bodyPath)
                  .find("form.cart")
                  .children()
                  .eq(2)
                  .find(".form-row a");
                $(Item03).each(function (_, item) {
                  const Item = $(item).attr("data-price");
                  const ItemN = Item.slice(
                    Item.indexOf(">") + 1,
                    Item.lastIndexOf("<") - 1
                  );
                  color_arr.push(ItemN);
                });
                const price$ = $(bodyPath)
                  .find(".product-info .price-on-sale ins")
                  .text();
                const price = Number(
                  price$.slice(price$.indexOf("$") + 1, price$.length)
                );
                let variants_arr = [];
                for (const type of type_arr) {
                  for (const size of size_arr) {
                    for (const color of color_arr) {
                      const itemVariant = {
                        option1: type,
                        option2: size,
                        option3: color,
                        price: price - 2,
                        origin_price: true,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      variants_arr.push(itemVariant);
                    }
                  }
                }
                // console.log(variants_arr);
                let listCate = ["HALLOWEEN"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "beeareworld.com";
                product["title"] = title + " " + makeid(10);
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "kingteeshops";
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
                product["option1_name"] = "Styles";
                product["option2_name"] = "Sizes";
                product["option3_name"] = "Colors";
                product["option1_picture"] = 0;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                send(product, "kingteeshops");
                // break;
                // console.log(variants_arr);
              } else {
                // window.open(linkForm);
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
