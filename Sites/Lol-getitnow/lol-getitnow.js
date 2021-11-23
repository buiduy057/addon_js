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
  window.location.href.indexOf("https://www.lol-getitnow.com") > -1 ||
  window.location.href.indexOf("https://lol-getitnow") > -1
) {
  if (window.location.href.indexOf("/product-category/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".shop-container .products .image-fade_in_back a"
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
                .text()
                .trim();
              const description = $(bodyPath).find("#tab-description").html();
              const data = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              let dataProduct_02 = data.replace(
                /attribute_us-size/gi,
                "attribute_us_size"
              );
              const dataVariant = JSON.parse(dataProduct_02);
              const tagsT = title.split(" ");
              const tag_arr = [];
              for (const item of tagsT) {
                if (item.length > 1) {
                  tag_arr.push(item);
                }
              }
              // console.log(dataVariant);
              let option1_name = "Dimension";
              let option2_name = "Colors";
              let imageThub = [];
              let imageitem = $(bodyPath).find(
                ".shop-container .product-thumbnails img"
              );
              $(imageitem).each(function (_, item) {
                imageThub.push($(item).attr("src"));
              });
              const sizeTest = $(bodyPath).find("#size");
              let variants_arr = [];
              if (Object.keys(dataVariant[0].attributes).length > 1) {
                if (dataVariant[0].attributes.attribute_us_size !== undefined) {
                  if (dataVariant[0].attribute_us_size !== undefined) {
                    for (const item of dataVariant) {
                      const itemVariant = {
                        option1: item.attributes.attribute_color,
                        option2: item.attributes.attribute_us_size,
                        price: item.display_price - 2,
                        origin_price: true,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      variants_arr.push(itemVariant);
                    }
                    // console.log(variants_arr);
                  } else {
                    const size_arr = [];
                    let itemsize = $(bodyPath).find(
                      ".shop-container #us-size option"
                    );
                    $(itemsize).each(function (_, item) {
                      if ($(item).attr("value") !== "") {
                        size_arr.push($(item).attr("value"));
                      }
                    });
                    for (const item of dataVariant) {
                      for (const size of size_arr) {
                        const itemVariant = {
                          option1: item.attributes.attribute_color,
                          option2: size,
                          price: item.display_price - 2,
                          origin_price: true,
                          shipping_cost: 0,
                          quantity: 9999,
                        };
                        variants_arr.push(itemVariant);
                      }
                    }
                    // console.log(variants_arr);
                  }
                } else {
                  if (dataVariant[0].attribute_size !== undefined) {
                    for (const item of dataVariant) {
                      const itemVariant = {
                        option1: item.attributes.attribute_color,
                        option2: item.attributes.attribute_size,
                        price: item.display_price - 2,
                        origin_price: true,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      variants_arr.push(itemVariant);
                    }
                    // console.log(variants_arr);
                  } else {
                    const size_arr = [];
                    let itemsize = $(bodyPath).find(
                      ".shop-container #size option"
                    );
                    $(itemsize).each(function (_, item) {
                      if ($(item).attr("value") !== "") {
                        size_arr.push($(item).attr("value"));
                      }
                    });
                    for (const item of dataVariant) {
                      for (const size of size_arr) {
                        const itemVariant = {
                          option1: item.attributes.attribute_color,
                          option2: size,
                          price: item.display_price - 2,
                          origin_price: true,
                          shipping_cost: 0,
                          quantity: 9999,
                        };
                        variants_arr.push(itemVariant);
                      }
                    }
                    // console.log(variants_arr);
                  }
                }
              }
              // console.log(variants_arr);
              let listCate = ["SHOES"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "getitnow";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = imageThub;
              product["variants"] = variants_arr;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tag_arr.toString();
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
              send(product, "getitnow");

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
