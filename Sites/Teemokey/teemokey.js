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
  window.location.href.indexOf("https://www.luxpu.com") > -1 ||
  window.location.href.indexOf("https://luxpu.com") > -1
) {
  $(window).ready(function () {
    if (window.location.href.indexOf("/categories/") > -1) {
      // console.log("ok");
      var url_string = window.location.href;
      let page = 0;
      async function getPage(page = 1) {
        try {
          const urlRequest = `${url_string}/page/${page}`;
          console.log(`page= ${page}`);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productsElement = $(body).find(
            ".category-page-row .products .image-none a"
          );
          const urlProducts = [];
          $(productsElement).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          const urlsUnique = [...new Set(urlProducts)];
          for (const path of urlsUnique) {
            try {
              const requestPath = path;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.text();
              let title = $(bodyPath)
                .find(".product-info .product-title")
                .text();
              let description = $(bodyPath).find(".tab-panels").html();
              let imageItem = $(bodyPath).find(".wp-post-image").attr("src");
              images = [];
              images.push(imageItem);
              const imgElement = $(bodyPath).find(".cart img");
              const image = ImageOption(imgElement);
              const itemSelect = $(bodyPath).find(
                "form.cart .wcpa_row .wcpa_form_item>label"
              );
              const itemId = $(bodyPath).find(
                "form.cart .wcpa_row>.wcpa_form_item"
              );

              const nameOption = NameOption(itemSelect);
              const var_id = NameOptionId(itemId);
              let var_style_price = [];
              let var_size_price = [];
              let var_sizes = [];
              let var_Images = [];
              let var_style = [];
              let variants = [];
              const data_price = $(bodyPath)
                .find("form.cart div")
                .attr("data-product");
              priceJson = JSON.parse(data_price);
              price = priceJson.wc_product_price;
              if (var_id.length > 2) {
                if (var_id[0].indexOf("image") > 1) {
                  var_Styles_Images = StylesImages(var_id[0], bodyPath);
                  var_style_price = StylesImagesPrice(var_id[0], bodyPath);
                  var_colors = Colors(var_id[1], bodyPath);
                  var_sizes = Sizes(var_id[2], bodyPath);
                  var_size_price = SizesPrice(var_id[2], bodyPath);
                  for (const itemstyle of var_Styles_Images) {
                    let price_item = Price(var_style_price, itemstyle, price);
                    const itemVariant = {
                      option1: itemstyle,
                      price: 0,
                      origin_price: true,
                    };
                    for (const itemcolors of var_colors) {
                      const itemVariant2 = {
                        ...itemVariant,
                        option2: itemcolors,
                        shipping_cost: 0,
                        quantity: 9999,
                      };
                      for (const itemsize of var_sizes) {
                        const itemVariant3 = {
                          ...itemVariant2,
                          option3: itemsize,
                          price: parseFloat(
                            checkPriceTemo(
                              itemsize,
                              price_item,
                              var_size_price
                            ) - 1
                          ).toFixed(2),
                        };
                        variants.push(itemVariant3);
                      }
                    }
                  }
                } else {
                  var_style = Sizes(var_id[0], bodyPath);
                  var_style_price = SizesPrice(var_id[0], bodyPath);
                  var_sizes = Sizes(var_id[1], bodyPath);
                  const sizesElement1 = $(bodyPath).find(
                    `#${var_id[2]} .wcpa_color label span`
                  );
                  $(sizesElement1).each(function (_, item) {
                    const item_alt = $(item).text();
                    var_sizes.push(item_alt);
                  });
                  for (const itemstyle of var_style) {
                    const itemVariant = {
                      option1: itemstyle,
                      price: Price(var_style_price, itemstyle, price),
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    for (const itemsize of var_sizes) {
                      const itemVariant1 = {
                        ...itemVariant,
                        option2: itemsize,
                      };
                      variants.push(itemVariant1);
                    }
                  }
                }
              } else {
                var_style = Styles(var_id[0], bodyPath);
                var_style_price = StylesPrice(var_id[0], bodyPath);
                var_sizes = Sizes(var_id[1], bodyPath);
                var_size_price = SizesPrice(var_id[1], bodyPath);
                for (const itemstyle of var_style) {
                  let price_item = Price(var_style_price, itemstyle, price);
                  const itemVariant = {
                    option1: itemstyle,
                    price: 0,
                    origin_price: true,
                  };
                  for (const itemsize of var_sizes) {
                    const itemVariant2 = {
                      ...itemVariant,
                      option2: itemsize,
                      price: parseFloat(
                        checkPriceTemo(itemsize, price_item, var_size_price) - 1
                      ).toFixed(2),
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    variants.push(itemVariant2);
                  }
                }
              }
              console.log(variants);
              // break;

              // let listCate = ["T-SHIRTS"];
              // tit = title + " " + makeid(10);
              // product = {};
              // ggcate = filterCategory(tit);
              // product["domain"] = "badoshoes.com";
              // product["title"] = title;
              // product["paypal"] = 0;
              // product["categories"] = listCate;
              // product["google_category"] = ggcate;
              // product["gender"] = "All";
              // product["vender"] = "teemokey";
              // product["vender_url"] = requestPath;
              // product["description"] = description;
              // product["images"] =
              //   imageThumb_arr.length > 1 ? imageThumb_arr : images;
              // product["variants"] = variants;
              // product["designed"] = -1;
              // product["trending"] = trending === true ? 1 : 0;
              // product["feedback"] = null;
              // product["tags"] = "";
              // product["rank"] = null;
              // product["vender_id"] = requestPath;
              // product["specifics"] = null;
              // product["option1_name"] = "Styles";
              // product["option2_name"] = "Dimension";
              // product["option1_picture"] = 0;
              // product["delivery_date_min"] = 5;
              // product["delivery_date_max"] = 20;
              // product["shipping_service_name"] = "Economy Shipping";
              // product["location"] = "USA";
              // // console.log(JSON.stringify(product));
              // send(product, "teemokey");
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
  // console.log(arr);
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      // console.log(id);
      let priceN = price + arr[i][1];
      // console.log(priceN);
      return priceN;
    }
  }
}
function checkImg(arr, id) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i][0]) {
      let img_item = arr[i][2];
      img.push(img_item);
      return img;
    }
  }
}
function checkImage(arr, id) {
  let img = [];
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      let option = arr[i].variant_group_image;
      img.push(option);
      return img;
    }
  }
}
function checkOptionVarr(arr, id) {
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      if (arr[i].label !== "All over print") {
        let option = arr[i].label;
        return option;
      } else {
        let option = "";
        return option;
      }
    }
  }
}
function checkOption(arr, id) {
  // console.log("ok");
  for (let i = 0; i <= arr.length - 1; i++) {
    if (id === arr[i].value_index) {
      let option = arr[i].label;
      return option;
    }
  }
}
function OptionSmName(item) {
  const Item = item.lastIndexOf("_");
  const ItemN = item.slice(Item + 1, item.length);
  const ItemChat = ItemN.charAt(0).toUpperCase() + ItemN.slice(1);
  return ItemChat;
}
function NameOptionId(itemSelect) {
  const varr_id = [];
  $(itemSelect).each(function (_, item) {
    const Item = `${$(item).attr("id")}`;
    if (Item.indexOf("select") > -1) {
      varr_id.push(Item);
    } else if (Item.indexOf("color") > -1) {
      varr_id.push(Item);
    } else if (Item.indexOf("image") > -1) {
      varr_id.push(Item);
    }
  });
  return varr_id;
}
function NameOption(itemSelect) {
  let optionName = {};
  let j = 1;
  for (let countFor = 0; countFor <= 1; countFor++) {
    $(itemSelect).each(function (_, item) {
      const Item = $(item).text().replace("*", "");
      if (countFor === 0) {
        if (Item.indexOf("Style") > -1) {
          optionName[`option${j}_name`] = OptionSmName(Item);
          j += 1;
        }
      } else {
        if (Item.indexOf("Style") === -1) {
          optionName[`option${j}_name`] = OptionSmName(Item);
          j += 1;
        }
      }
    });
  }
  return optionName;
}
function StylesImages(item, bodyPath) {
  const var_style = [];
  const stylesElement = $(bodyPath).find(`#${item} .wcpa_image`);
  $(stylesElement).each(function (_, item) {
    const item_alt = $(item).find("label").text();
    var_style.push(item_alt);
  });
  return var_style;
}
function Styles(item, bodyPath) {
  const var_style = [];
  const stylesElement = $(bodyPath).find(`#${item} select option`);
  $(stylesElement).each(function (_, item) {
    const item_alt = $(item).attr("value");
    var_style.push(item_alt);
  });
  return var_style;
}
function StylesImagesPrice(item, bodyPath) {
  const var_style = [];
  const stylesElement = $(bodyPath).find(`#${item} .wcpa_image`);
  $(stylesElement).each(function (_, item) {
    const var_item = [];
    const item_label = $(item).find("img").attr("alt");
    const item_value_price = $(item).find("input").attr("data-price");
    priceAddJson = JSON.parse(item_value_price);
    priceAdd = priceAddJson.value;
    var_item.push(item_label);
    var_item.push(priceAdd);
    var_style.push(var_item);
  });
  return var_style;
}
function StylesPrice(item, bodyPath) {
  const var_style = [];
  const stylesElement = $(bodyPath).find(`#${item} select option`);
  $(stylesElement).each(function (_, item) {
    const var_item = [];
    const item_label = $(item).attr("value");
    const item_value_price = $(item).attr("data-price");
    priceAddJson = JSON.parse(item_value_price);
    priceAdd = priceAddJson.value;
    var_item.push(item_label);
    var_item.push(priceAdd);
    var_style.push(var_item);
  });
  return var_style;
}
function Sizes(item, bodyPath) {
  const var_colors = [];
  const sizesElement = $(bodyPath).find(`#${item} .wcpa_color label span`);
  $(sizesElement).each(function (_, item) {
    const item_alt = $(item).text();
    var_colors.push(item_alt);
  });
  return var_colors;
}
function Colors(item, bodyPath) {
  const var_colors = [];
  const sizesElement = $(bodyPath).find(`#${item} .wcpa_color label span`);
  $(sizesElement).each(function (_, item) {
    const item_alt = $(item).attr("title");
    var_colors.push(item_alt);
  });
  return var_colors;
}
function SizesPrice(item, bodyPath) {
  const var_size_price = [];
  const varpriceElement = $(bodyPath).find(`#${item} .wcpa_color`);
  $(varpriceElement).each(function (_, item) {
    const var_item = [];
    const item_value_price = $(item).find("input").attr("data-price");
    let item_label = $(item).text().trim();
    priceAddJson = JSON.parse(item_value_price);
    priceAdd = priceAddJson.value;
    var_item.push(item_label);
    var_item.push(priceAdd);
    var_size_price.push(var_item);
  });
  return var_size_price;
}

function ImageOption(imgElement) {
  var_img = [];
  $(imgElement).each(function (_, item) {
    let item_img = $(item).attr("src");
    var_img.push(item_img);
  });
  return var_img;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
