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
  window.location.href.indexOf("https://www.ironville.com") > -1 ||
  window.location.href.indexOf("https://ironville.com") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
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
            ".listing_products_no_sidebar  .product_item > a"
          );
          // console.log(productItem);
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(urlsUnique);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const requestPath = `${path}`;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.text();

              const data = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              const dataVariant = JSON.parse(data);
              const title = $(bodyPath)
                .find(".product_infos h1.product_title")
                .text();
              const description = $(bodyPath).find("#tab-description").html();
              const tagsT = title.split(" ");
              const tag_arr = [];
              for (const item of tagsT) {
                if (item !== "-") {
                  tag_arr.push(item);
                }
              }
              let images_arr = [];
              const Item_02 = $(bodyPath).find(
                ".global_content_wrapper .woocommerce-product-gallery img "
              );
              $(Item_02).each(function (_, item) {
                images_arr.push($(item).attr("src"));
              });
              // console.log(dataVariant);
              let option1_name = "";
              let option2_name = "";
              let variants_arr = [];
              if (dataVariant !== false) {
                option1_name = "Colors";
                option2_name = "Dimension";

                for (const item_1 of dataVariant) {
                  const itemVariant = {
                    option1: item_1.attributes.attribute_pa_color,
                    option2: item_1.attributes.attribute_pa_size,
                    price: item_1.display_price - 2,
                    origin_price: true,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants_arr.push(itemVariant);
                }
              } else {
                let size_arr = [];
                const Item_01 = $(bodyPath).find("#pa_size option");
                // console.log(Item_01);
                $(Item_01).each(function (_, item) {
                  // console.log(item);
                  if ($(item).attr("value") !== "") {
                    size_arr.push($(item).attr("value"));
                  }
                });

                let color_arr = [];
                const Item_02 = $(bodyPath).find("#pa_color option");
                // console.log(Item_01);
                $(Item_02).each(function (_, item) {
                  // console.log(item);
                  if ($(item).attr("value") !== "") {
                    color_arr.push($(item).attr("value"));
                  }
                });
                const productid = $(bodyPath)
                  .find("form.cart")
                  .attr("data-product_id");
                // console.log(productid);

                for (const item_1 of color_arr) {
                  for (const item_2 of size_arr) {
                    const formData = new FormData();
                    formData.append("attribute_pa_size", item_2);
                    formData.append("attribute_pa_color", item_1);
                    formData.append("product_id", productid);
                    await fetch(
                      "https://www.ironville.com/?wc-ajax=get_variation",
                      {
                        method: "POST",
                        body: formData,
                      }
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        const dataI = data;
                        const itemVariant = {
                          option1: item_1,
                          option2: item_2,
                          price: dataI.display_price - 2,
                          origin_price: true,
                          shipping_cost: 0,
                          quantity: 9999,
                        };
                        variants_arr.push(itemVariant);
                      });
                  }
                }
              }

              // console.log(variants_arr);
              // console.log(size_arr);
              // break;

              console.log(variants_arr);
              let listCate = ["OTHERS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "ironville";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images_arr;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tag_arr;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option2_name"] = option2_name;
              product["option1_picture"] = 0;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              // send(product, "ironville");
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
function checkPriceRo(item) {
  const begin = item.indexOf("$");
  const end = item.indexOf("+");
  const price = item.slice(begin + 1, end - 1);
  return price;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
