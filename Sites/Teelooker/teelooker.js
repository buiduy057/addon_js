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
  console.log(item);
  // $.ajax({
  //   url: "https://api.teearechill.com/admin/product/create-tool",
  //   type: "post",
  //   dataType: "text",
  //   data: {
  //     item: JSON.stringify(item),
  //   },
  //   vender: vender,
  //   success: function (data) {
  //     console.log(data);
  //     // console.log(this.next);
  //     // window.close();
  //   },
  //   error: function (request, error) {
  //     console.log(data);
  //     // var url_string  = window.location.href;
  //     // window.location.href = url_string;
  //     // window.close();
  //   },
  // });
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
  window.location.href.indexOf("https://www.teelooker.com") > -1 ||
  window.location.href.indexOf("https://teelooker.com") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;

      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}/`;
          // console.log(urlRequest);
          if (page > 261) return;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".ast-woocommerce-container .products .astra-shop-thumbnail-wrap a"
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
              const title = $(bodyPath).find("h1.entry-title ").text();
              const variants = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              const variants01 = variants.replace(
                /attribute_3d-product/gi,
                "attribute_3d_product"
              );
              const optionName = {};
              const dataVariants = JSON.parse(variants01);
              const description = $(bodyPath).find("#tab-description").html();
              let tags = "Hunting,Fishing,Camping";
              let imageThub = [];
              let imageitem = $(bodyPath).find(
                ".ast-woocommerce-container .wpgs-nav img"
              );
              $(imageitem).each(function (_, item) {
                const Item = $(item).attr("src");
                const ItemN = Item.replace("-100x100", "");
                imageThub.push(ItemN);
              });

              const itemSelect = $(bodyPath).find("form.cart select");
              const dataVarr = dataVariants;
              let n = 1;
              $(itemSelect).each(function (_, item) {
                optionName[`option${n}_name`] = checkOptionNameTe(
                  $(item).attr("id")
                );
                n += 1;
              });
              let variants_arr = [];
              let option1_picture = 0;
              for (const item of dataVarr) {
                option1_picture = 0;
                const itemVariant = {
                  sku: item.sku,
                  price: Number(item.display_price) - 1,
                  origin_price: true,
                  shipping_cost: 0,
                  quantity: 9999,
                };
                let l = 1;
                if (Object.keys(optionName).length > 1) {
                  for (let countFor = 0; countFor <= 1; countFor++) {
                    for (const option in dataVariants[0].attributes) {
                      if (countFor === 0) {
                        if (option.indexOf("product") > -1) {
                          itemVariant[`option${l}`] = checkOptionNameTe(
                            item.attributes[option]
                          );
                          l += 1;
                        }
                      } else {
                        if (option.indexOf("product") === -1) {
                          itemVariant[`option${l}`] = item.attributes[
                            option
                          ].toUpperCase();
                          l += 1;
                        }
                      }
                    }
                  }
                } else {
                  for (const option in dataVariants[0].attributes) {
                    itemVariant[`option${l}`] = item.attributes[
                      option
                    ].toUpperCase();
                  }
                }
                variants_arr.push(itemVariant);
              }
              // console.log(variants_arr);
              let listCate = ["HUNTING"];
              const itemCate = $(bodyPath)
                .find(".woocommerce-breadcrumb  a")
                .eq(2)
                .text()
                .toUpperCase();
              if (itemCate !== "") {
                const itemCateN = itemCate.replace("HUNTING", "").trim();
                listCate.push(itemCateN);
              }
              tit = title + " " + makeid(10);
              product = {
                ...optionName,
              };
              ggcate = filterCategory(tit);
              product["domain"] = `outdoorpod.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `outdoorpod_teelooker`;
              product["vender_url"] = path;
              product["description"] = "";
              product["images"] = imageThub;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tags;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = option1_picture;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `outdoorpod_teelooker`);
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

        getPage(++page);
      }
      getPage();
    });
  }
}
function checkOptionNameTe(item) {
  const Item = item.slice(item.indexOf("_3d") + 3, item.length);
  const ItemChat = Item.charAt(0).toUpperCase() + Item.slice(1);
  return ItemChat;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
