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
  window.location.href.indexOf("https://www.teenavi.com") > -1 ||
  window.location.href.indexOf("https://teenavi") > -1
) {
  if (window.location.href.indexOf("/shop/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 3) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}/page/${page}/`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(
            ".category-page-row .product-small a"
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
              let image = $(bodyPath)
                .find(".shop-container .product-images img")
                .attr("src");
              let images = [];
              // console.log(imageThumb_arr);
              images.push(image);
              const dataProduct = $(bodyPath)
                .find(".wcpa_form_outer")
                .attr("data-product");
              let option1_name = "";
              let option2_name = "";
              let option3_name = "";
              let variants = [];
              let option1_picture = 0;
              if (
                typeof dataProduct !== typeof undefined &&
                dataProduct !== false
              ) {
                // console.log("vao");
                option1_picture = 1;
                option1_name = "Styles";
                option2_name = "Colors";
                option3_name = "Dimension";
                let styles = [];
                const stylesElement = $(bodyPath).find(
                  "#wcpa-image-group-1573711576577"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-image-group-1573711576577 .wcpa_image_wrap img"
                    )
                  : $(bodyPath).find(
                      "#wcpa-image-group-5e383e1d625bc .wcpa_image_wrap img"
                    );
                // console.log(stylesElement);
                $(stylesElement).each(function (_, item) {
                  const item_alt = $(item).attr("alt");
                  styles.push(item_alt);
                });
                // console.log(styles);
                let colors = [];
                const colorsElement = $(bodyPath).find(
                  "#wcpa-color-group-1573711332006"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-color-group-1573711332006 .wcpa_color input"
                    )
                  : $(bodyPath).find(
                      "#wcpa-color-group-5e383e1d62665 .wcpa_color input"
                    );
                $(colorsElement).each(function (_, item) {
                  const item_color = $(item).attr("value");
                  colors.push(item_color);
                });
                // console.log(colors);
                let sizes = [];
                const sizesElement = $(bodyPath).find(
                  "#wcpa-color-group-1573712080996"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-color-group-1573712080996 .wcpa_color  input"
                    )
                  : $(bodyPath).find(
                      "#wcpa-color-group-5e383e1d62a8d .wcpa_color  input"
                    );
                $(sizesElement).each(function (_, item) {
                  const item_size = $(item).attr("value");
                  sizes.push(item_size);
                });
                // console.log(sizes);

                priceJson = JSON.parse(dataProduct);
                price = priceJson.wc_product_price;
                let var_styles = [];
                const varStylesElement = $(bodyPath).find(
                  "#wcpa-image-group-1573711576577"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-image-group-1573711576577 .wcpa_image"
                    )
                  : $(bodyPath).find(
                      "#wcpa-image-group-5e383e1d625bc .wcpa_image"
                    );
                $(varStylesElement).each(function (_, item) {
                  // console.log(item);
                  const var_item = [];
                  const item_label = $(item).find("img").attr("alt");
                  const item_value_price = $(item)
                    .find("input")
                    .attr("data-price");
                  priceAddJson = JSON.parse(item_value_price);
                  priceAdd = priceAddJson.value;
                  var_item.push(item_label);
                  var_item.push(priceAdd);
                  var_styles.push(var_item);
                });

                let var_img = [];
                const varimgElement = $(bodyPath).find(
                  "#wcpa-image-group-1573711576577"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-image-group-1573711576577 .wcpa_image"
                    )
                  : $(bodyPath).find(
                      "#wcpa-image-group-5e383e1d625bc .wcpa_image"
                    );
                $(varimgElement).each(function (_, item) {
                  // console.log(item);
                  const var_item = [];
                  const item_label = $(item).find("img").attr("alt");
                  const item_value_price = $(item).find("img").attr("src");
                  var_item.push(item_label);
                  var_item.push(item_value_price);
                  var_img.push(var_item);
                });
                // console.log(var_img);
                let var_price = [];
                const varpriceElement = $(bodyPath).find(
                  "#wcpa-color-group-1573712080996"
                ).length
                  ? $(bodyPath).find(
                      "#wcpa-color-group-1573712080996 .wcpa_color"
                    )
                  : $(bodyPath).find(
                      "#wcpa-color-group-5e383e1d62a8d .wcpa_color"
                    );
                $(varpriceElement).each(function (_, item) {
                  let var_item = [];
                  let item_label = $(item).find("span").attr("title");
                  const item_value_price = $(item)
                    .find("input")
                    .attr("data-price");
                  priceAddJson = JSON.parse(item_value_price);
                  priceAdd = priceAddJson.value;
                  var_item.push(item_label);
                  var_item.push(priceAdd);
                  var_price.push(var_item);
                });
                for (const itemstyle of styles) {
                  let price_item = Price(var_styles, itemstyle, price);
                  const itemVariant = {
                    option1: itemstyle,
                    price: 0,
                    origin_price: true,
                    var_images: checkImg(var_img, itemstyle),
                  };

                  // variants.push(itemVariant2);
                  for (const itemcolor of colors) {
                    const itemVariant2 = {
                      ...itemVariant,
                      option2: itemcolor,
                    };
                    for (const itemsize of sizes) {
                      const itemVariant3 = {
                        ...itemVariant2,
                        option3: itemsize,
                        price:
                          checkPriceTemo(itemsize, price_item, var_price) - 1,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      variants.push(itemVariant3);
                    }
                  }
                }
                // console.log(variants);
              } else {
                const dataVariants = $(bodyPath)
                  .find("form.cart")
                  .attr("data-product_variations");
                const dataJson = JSON.parse(dataVariants);
                // console.log(dataJson);
                if (Object.keys(dataJson[0].attributes).length > 2) {
                  option1_name = "Styles";
                  option2_name = "Colors";
                  option3_name = "Dimension";
                  let varColor = [];
                  let itemColor = $(bodyPath).find("#pa_color option");
                  $(itemColor).each(function (_, item) {
                    if ($(item).attr("value") !== "") {
                      varColor.push($(item).attr("value"));
                    }
                  });
                  let varsize = [];
                  let itemsize = $(bodyPath).find("#pa_size option");
                  $(itemsize).each(function (_, item) {
                    if ($(item).attr("value") !== "") {
                      varsize.push($(item).attr("value"));
                    }
                  });
                  // console.log(varColor);
                  for (const item of dataJson) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_style,
                      option3: item.attributes.attribute_pa_size,
                      price: item.display_price,
                      cost: item.display_price - 2,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    for (const itemcolor of varColor) {
                      const itemVariant2 = {
                        ...itemVariant,
                        option2: itemcolor,
                      };
                      for (const itemsize of varsize) {
                        const itemVariant3 = {
                          ...itemVariant2,
                          option3: itemsize,
                        };
                        variants.push(itemVariant3);
                      }
                    }
                  }
                  // console.log(variants);
                } else {
                  option1_name = "Styles";
                  option2_name = "Dimension";
                  for (const item of dataJson) {
                    const itemVariant = {
                      option1: item.attributes.attribute_pa_style,
                      option2: item.attributes.attribute_pa_size,
                      origin_price: true,
                      var_images: checkImageBuImage(item.image),
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
              let listCate = ["T-SHIRTS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "teenavi";
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = images;
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
              product["option1_picture"] = option1_picture;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, "teenavi");

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
function Price(arr, id, price) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let priceN = price + parseInt(arr[i][1]);
      return priceN;
    }
  }
}
function checkPriceTemo(id, price, var_price) {
  for (let i = 0; i <= var_price.length - 1; i++) {
    if (id === var_price[i][0]) {
      let priceN = price + var_price[i][1];
      return priceN;
    }
  }
}
function checkPrice(arr, id, price) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let priceN = price + arr[i][1];
      return priceN;
    }
  }
}
function checkImg(varr, id) {
  let var_img = [];
  for (let i = 0; i <= varr.length - 1; i++) {
    if (id === varr[i][0]) {
      var_img.push(varr[i][1]);
      return var_img;
    }
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
