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
  window.location.href.indexOf("https://www.storesp.com") > -1 ||
  window.location.href.indexOf("https://storesp.com") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    async function getPage(page = 2) {
      try {
        let pageHref = `${url_string}/page/${page}/`;
        let urlProducts = [];
        console.log(`page=${page}`);
        const rq = await fetch(pageHref);
        const bodyJson = await rq.text();
        const dataHref = $(bodyJson).find(
          ".shop-container .image-fade_in_back a"
        );
        $(dataHref).each(function (_, item) {
          urlProducts.push($(item).attr("href"));
        });
        // console.log(urlProducts);
        const urlsUnique = [...new Set(urlProducts)];

        for (const path of urlsUnique) {
          try {
            // console.log(path);
            // const urlProduct = `https://www.storesp.com/${path}`;
            const productJson = await fetch(path);
            const bodyPath = await productJson.text();
            let dataItem = $(bodyPath)
              .find("form.cart")
              .attr("data-product_variations");
            let dataProduct_02 = dataItem.replace(
              /attribute_us-size/gi,
              "attribute_us_size"
            );

            let dataVariants = JSON.parse(dataProduct_02);
            // console.log(dataVariants);
            let title = $(bodyPath).find("h1.product-title").text();
            let description = $(bodyPath).find("#tab-description ").html();
            let image = $(bodyPath).find(
              ".product-container .product-thumbnails img"
            );
            var_img = [];
            $(image).each(function (_, item) {
              let item_img = $(item).attr("src");
              var_img.push(item_img);
            });
            let option1_name = "";
            let option2_name = "";
            let option3_name = "";
            let variants = [];
            if (Object.keys(dataVariants[0].attributes).length > 2) {
              option1_name = "Styles";
              option2_name = "Colors";
              option3_name = "Dimension";
              let var_Styles = [];
              let itemStyles = $(bodyPath).find("#style option");
              $(itemStyles).each(function (_, item) {
                let Item = $(item).attr("value");
                if (Item !== "") {
                  var_Styles.push(Item);
                }
              });
              // console.log(var_Styles);
              let var_Sizes = [];
              let itemSizes = $(bodyPath).find("#size option");
              $(itemSizes).each(function (_, item) {
                let Item = $(item).attr("value");
                if (Item !== "") {
                  var_Sizes.push(Item);
                }
              });
              for (const item of dataVariants) {
                for (const itemStyles of var_Styles) {
                  for (const itemSizes of var_Sizes) {
                    const itemVariant = {
                      option1: itemStyles,
                      option2: item.attributes.attribute_color,
                      option3: itemSizes,
                      origin_price: true,
                      var_images: checkImageBuImage(item.image),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                }
              }
              // console.log(variants);
            } else {
              if (dataVariants[0].attributes.attribute_set !== undefined) {
                option1_name = "Styles";
                option2_name = "Dimension";

                let var_Styles = [];
                let itemStyles = $(bodyPath).find("#set option");
                $(itemStyles).each(function (_, item) {
                  let Item = $(item).attr("value");
                  if (Item !== "") {
                    var_Styles.push(Item);
                  }
                });
                for (const item of dataVariants) {
                  for (const itemStyles of var_Styles) {
                    const itemVariant = {
                      option1: itemStyles,
                      option2: item.attributes.attribute_set,
                      origin_price: true,
                      var_images: checkImageBuImage(item.image),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
                }
                // console.log(variants);
              } else if (
                dataVariants[0].attributes.attribute_us_size !== undefined
              ) {
                option1_name = "Styles";
                option2_name = "Dimension";

                let var_Sizes = [];
                let itemSizes = $(bodyPath).find("#us-size option");
                $(itemSizes).each(function (_, item) {
                  let Item = $(item).attr("value");
                  if (Item !== "") {
                    var_Sizes.push(Item);
                  }
                });
                for (const item of dataVariants) {
                  for (const itemSizes of var_Sizes) {
                    const itemVariant = {
                      option1: item.attributes.attribute_style,
                      option2: itemSizes,
                      origin_price: true,
                      var_images: checkImageBuImage(item.image),
                      price: item.display_price,
                      cost: item.display_price - 2,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant);
                  }
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
            product["vender"] = "storesp";
            product["vender_url"] = path;
            product["description"] = description;
            product["images"] = var_img;
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
            send(product, "storesp");
            // console.log(var_img);
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
function checkImageBuImage(images) {
  // console.log(images);
  let img = [];
  img.push(images.url);
  return img;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
