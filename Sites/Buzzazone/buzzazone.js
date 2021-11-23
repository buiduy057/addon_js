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
      window.close();
    },
    error: function (request, error) {
      console.log(data);

      // var url_string  = window.location.href;
      // window.location.href = url_string;
      window.close();
    },
  });
}

function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
function option(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].id) {
      let option = arr[i].label;
      return option;
    }
  }
}
function option_images(arr, id) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].id) {
      let option = arr[i].group_image;
      img.push(option);
      return img;
    }
  }
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  getPage();
});
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
if (window.location.href.indexOf("https://xx.com") > -1) {
  console.log("404");
} else if (
  window.location.href.indexOf("https://www.buzzazone.com") > -1 ||
  window.location.href.indexOf("https://buzzazone.com") > -1
) {
  $(window).ready(function () {
    if (window.location.href.indexOf("/product-category/") > -1) {
      console.log("ok");
      var url_string = window.location.href;
      let page = 0;
      async function getPage(page = 46) {
        try {
          const urlRequest = `${url_string}/page/${page}/`;
          console.log(`page= ${page}`);
          const rq = await fetch(urlRequest);
          const body = await rq.text();

          const productsElement = $(body).find(
            ".shop-container .product-small a"
          );
          const urlProducts = [];
          $(productsElement).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          const urlsUnique = [...new Set(urlProducts)];
          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const rq = await fetch(path);
              const bodyPath = await rq.text();

              let title = $(bodyPath)
                .find(".product-info h1.product-title")
                .text();
              console.log(title);
              let description = $(bodyPath)
                .find(".product-short-description")
                .html();
              // Object.keys(myObj).length;
              let variants = [];
              const dataProduct = $(bodyPath)
                .find("form.cart")
                .attr("data-product_variations");
              let dataProduct_01 = dataProduct.replace(
                /attribute_pa_blanket-size/gi,
                "attribute_pa_blanket_size"
              );
              let dataProduct_02 = dataProduct_01.replace(
                /attribute_pa_quilt-size/gi,
                "attribute_pa_quilt_size"
              );
              let dataProduct_03 = dataProduct_02.replace(
                /attribute_pa_shoes-size/gi,
                "attribute_pa_shoes_size"
              );
              const data_variant = JSON.parse(dataProduct_03);
              // console.log(data_variant);
              // console.log(Object.keys(data_variant[0].attributes).length);
              let option1_name = "";
              let option2_name = "";
              let option3_name = "";
              if (Object.keys(data_variant[0].attributes).length > 2) {
                option1_name = "Styles";
                option2_name = "Colors";
                option3_name = "Dimension";
                for (const item of data_variant) {
                  const itemVariant = {
                    option1: item.attributes.attribute_pa_style,
                    option2: item.attributes.attribute_pa_color,
                    option3: item.attributes.attribute_pa_size,
                    origin_price: true,
                    var_images: checkImageBuImage(
                      item.variation_gallery_images
                    ),
                    price: item.display_price,
                    cost: item.display_price - 2,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants.push(itemVariant);
                }
                // console.log(variants);
              } else if (Object.keys(data_variant[0].attributes).length > 1) {
                if (
                  data_variant[0].attributes.attribute_pa_size !== undefined
                ) {
                  option1_name = "Colors";
                  option2_name = "Dimension";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_color,
                      option2: item.attributes.attribute_pa_size,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                  // console.log(variants);
                } else if (
                  data_variant[0].attributes.attribute_pa_gender !== undefined
                ) {
                  option1_name = "Styles";
                  option2_name = "Dimension";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_gender,
                      option2: item.attributes.attribute_pa_shoes_size,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                } else if (
                  data_variant[0].attributes.attribute_pa_color !== undefined
                ) {
                  option1_name = "Styles";
                  option2_name = "Colors";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_style,
                      option2: item.attributes.attribute_pa_color,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                }
                // console.log(variants);
              } else {
                if (
                  data_variant[0].attributes.attribute_pa_size !== undefined
                ) {
                  option1_name = "Dimension";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_size,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                  // console.log(variants);
                } else if (
                  data_variant[0].attributes.attribute_pa_quilt_size !==
                  undefined
                ) {
                  option1_name = "Dimension";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_quilt_size,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                  // console.log(variants);
                } else if (
                  data_variant[0].attributes.attribute_pa_blanket_size !==
                  undefined
                ) {
                  option1_name = "Dimension";
                  for (const item of data_variant) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_blanket_size,
                      origin_price: true,
                      var_images: checkImageBuImage(
                        item.variation_gallery_images
                      ),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                  // console.log(variants);
                }
              }
              let listCate = ["OTHERS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "buzzazone";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = variants[0].var_images;
              product["variants"] = variants;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option2_name"] =
                option2_name !== undefined ? option2_name : "";
              product["option3_name"] =
                option3_name !== undefined ? option3_name : "";
              product["option1_picture"] = 1;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              // send(product, "buzzazone");

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
    }
  });
}
function checkImageBuImage(images) {
  let img = [];
  for (const item of images) {
    img.push(item.url);
  }
  return img;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
