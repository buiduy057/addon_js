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
  window.location.href.indexOf("https://www.epsilonstars.com") > -1 ||
  window.location.href.indexOf("https://epsilonstars.com") > -1
) {
  $(window).ready(function () {
    if (window.location.href.indexOf("/shop/") > -1) {
      // console.log("ok");
      var url_string = window.location.href;
      let page = 0;
      async function getPage(page = 1) {
        try {
          const urlRequest = `${url_string}/page/${page}/`;
          console.log(`page= ${page}`);
          const rq = await fetch(urlRequest);
          const body = await rq.text();

          const productsElement = $(body).find(".products .product-small a");
          const urlProducts = [];
          $(productsElement).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          const urlsUnique = [...new Set(urlProducts)];
          for (const path of urlsUnique) {
            try {
              const end = path.lastIndexOf("/");
              const begin = path.lastIndexOf("product");
              const vender_id = path.slice(begin + 8, end);
              // console.log(vender_id);
              const requestPath = path;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.text();
              let title = $(bodyPath)
                .find(".product-info .product-title")
                .text();
              // console.log(title);
              let description = $(bodyPath).find("#tab-description").html();
              var_img = [];
              const imgElement = $(bodyPath).find(".product-thumbnails  img");
              $(imgElement).each(function (_, item) {
                let item_img = $(item).attr("data-src");
                if (item_img != undefined) {
                  let rq = item_img.replace("-247x296", "");
                  var_img.push(rq);
                }
              });

              let text_var = $(bodyPath)
                .find("form.variations_form")
                .attr("data-product_variations");
              // let textstringify = JSON.stringify(text_var);
              let textJson = text_var.replace(
                /attribute_phone-model/gi,
                "attribute_phone_model"
              );
              data_var = JSON.parse(textJson);
              console.log(data_var);
              if (data_var === false) {
                const variants = bodyPath.match(
                  /window\.pysWooProductData\[([0-9]+)\] = (.*?);\n/
                );
                const arr = [];
                arr.push(variants);
                // const variantJson = JSON.parse(variants[2]);

                // arr.push(variantJson);

                console.log(arr);
              } else {
                let option1_name =
                  $(bodyPath).find(".label label[for='phone-model']").text() ===
                  ""
                    ? $(bodyPath).find(".label label[for='type']").text()
                    : $(bodyPath)
                        .find(".label label[for='phone-model']")
                        .text();
                let variants = [];
                let sizes = [];
                let sizeItem = $(bodyPath).find("#case-surface option");
                $(sizeItem).each(function (_, item) {
                  let item_size = $(item).attr("value");
                  if (item_size !== "") {
                    sizes.push(item_size);
                  }
                });
                // console.log(sizes);
                for (const item of data_var) {
                  const itemVariant = {
                    option1: item.attributes.attribute_phone_model,
                    origin_price: true,
                    price: item.display_price,
                    cost: item.display_price - 2,
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants.push(itemVariant);
                }
                // console.log(variants);
                let listCate = ["OTHERS"];
                tit = title + " " + makeid(10);
                product = {};
                ggcate = filterCategory(tit);
                product["domain"] = "customray.com";
                product["title"] = title + " " + makeid(10);
                product["categories"] = listCate;
                product["google_category"] = ggcate;
                product["gender"] = "All";
                product["vender"] = "epsilonstars";
                product["vender_url"] = path;
                product["description"] = description;
                product["images"] = var_img;
                product["variants"] = variants;
                product["designed"] = -1;
                product["trending"] = trending === true ? 1 : 0;
                product["feedback"] = null;
                product["tags"] = "";
                product["rank"] = null;
                product["vender_id"] = vender_id;
                product["specifics"] = null;
                product["option1_name"] = option1_name;
                product["option1_picture"] = 0;
                product["delivery_date_min"] = 5;
                product["delivery_date_max"] = 20;
                product["shipping_service_name"] = "Economy Shipping";
                product["location"] = "USA";
                // console.log(JSON.stringify(product));
                // send(product, "epsilonstars");
                // break;
                // console.log(data_var);
              }
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
    }
  });
}
function CheckSize(name) {
  const begin = name.lastIndexOf("/");
  let productItem = name.slice(0, begin);
  let productBack = name.slice(begin + 1, name.length);

  if (productItem.length < 4) {
    if (productItem === "KID") {
      return productBack;
    } else {
      return productItem;
    }
  } else {
    return productBack;
  }
}
function CheckProduct(name) {
  const begin = name.lastIndexOf("/");
  let productItem = name.slice(0, begin);
  let productBack = name.slice(begin + 1, name.length);
  if (productItem.length < 4) {
    if (productItem === "KID") {
      return productItem;
    } else {
      return productBack;
    }
  } else {
    return productItem;
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
