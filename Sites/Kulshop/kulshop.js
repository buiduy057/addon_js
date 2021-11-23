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
    url: "https://api.teearechill.com/admin/product/create-tool",
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
  window.location.href.indexOf("https://www.kulshop.us") > -1 ||
  window.location.href.indexOf("https://kulshop.us") > -1
) {
  if (window.location.href.indexOf("/shop/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      let page_arr = [];
      console.log(page_arr);
      await getPage();
    });
  }
}
// function filterTile(title) {
//   const Item = title.toUpperCase();
//   if (Item.indexOf("THROW PILLOW") !== -1) {
//     return ["APPAREL", "THROW PILLOW"];
//   } else if (Item.indexOf("MUGS") !== -1) {
//     return ["APPAREL", "MUGS"];
//   } else if (Item.indexOf("BLANKET") !== -1) {
//     return ["APPAREL", "BLANKETS"];
//   } else if (Item.indexOf("POSTER") !== -1) {
//     return ["APPAREL", "CANVAS"];
//   } else {
//     return ["APPAREL", "T-SHIRTS"];
//   }
// }
async function getPage(page = 1) {
  try {
    let urlProducts = [];
    console.log(`page=${page}`);
    // console.log(page_arr);
    if (page < 62) {
      const urlRequest = `${url_string}page/${page}/`;
      // console.log(urlRequest);
      const rq = await fetch(urlRequest);
      const body = await rq.text();

      const ItemHref = $(body).find(".shop-container .products .image-none a");
      $(ItemHref).each(function (_, item) {
        urlProducts.push($(item).attr("href"));
      });

      const urlsUnique = [...new Set(urlProducts)];
      // console.log(data);
      if(!urlsUnique.length) return;
      else{
        for (const path of urlsUnique) {
          try {
            // console.log(path);
            const rqPath = await fetch(path);
            const bodyPath = await rqPath.text();
            const variants = bodyPath.match(/variants: (.*?)}],/);
            const variantJson = JSON.parse(variants[1] + "}]");
            const options = bodyPath.match(/options: (.*?)},/);
            const optionJson = JSON.parse(options[1] + "}");
            // if (optionJson.indexOf())
            //   console.log(optionJson.women - right - size);
            // console.log(variantJson);
            let option1_name = "";
            let option2_name = "";
            let option3_name = "";
  
            if (variantsNumber(variantJson[0].attributes) > 2) {
              option1_name = "Styles";
              option2_name = "Colors";
              option3_name = "Dimension";
            } else if (variantsNumber(variantJson[0].attributes) > 1) {
              if (optionJson.material !== undefined) {
                option1_name = "Styles";
                option2_name = "Dimension";
              } else {
                option1_name = "Colors";
                option2_name = "Dimension";
              }
            } else {
              option1_name = "Dimension";
            }
            let title = $(bodyPath).find(".product-info h1.product-title").text();
            // console.log(title);
            let tags = "Apparel";
            let description = $(bodyPath).find("#tab-refund_policy").html();
            let images_arr = [];
            const itemImg = $(bodyPath).find(
              ".shop-container .product-thumbnails img"
            );
            $(itemImg).each(function (_, item) {
              images_arr.push($(item).attr("src"));
            });
            let variants_arr = [];
            // variantsNumber(variantJson[0].attributes);
            // console.log(variantsNumber(variantJson[0].attributes));
            for (const item of variantJson) {
              const itemVariant = {
                sku: item.sku,
                option1: checkOptionKu01(
                  variantsNumber(variantJson[0].attributes),
                  item.attributes
                ),
  
                option2:
                  variantsNumber(variantJson[0].attributes) > 1
                    ? checkOptionKu02(
                        variantsNumber(variantJson[0].attributes),
                        item.attributes
                      )
                    : "",
                option3:
                  variantsNumber(variantJson[0].attributes) > 2
                    ? item.attributes.attribute_size
                    : "",
                var_images: CheckImgKu(item.image),
                price: Number(item.display_price) - 1,
                origin_price: true,
                shipping_cost: 0,
                quantity: 9999,
              };
              variants_arr.push(itemVariant);
            }
            // console.log(variants_arr);
  
            let listCate = ["APPAREL"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = "yayamimi.shop";
            product["title"] = title + " " + makeid(10);
            product["categories"] = listCate;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = "yayamimi_kulshop";
            product["vender_url"] = path;
            product["description"] = description;
            product["images"] = images_arr;
            product["variants"] = variants_arr;
            product["designed"] = -1;
            product["trending"] = trending === true ? 1 : 0;
            product["feedback"] = null;
            product["tags"] = tags;
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
            send(product, "yayamimi_kulshop");
            // break;
          } catch (e) {
            console.error(e);
          } finally {
            await timeOut(800);
          }
        }
      }
    } else {
      return;
    }
      getPage(++page);
  } catch (e) {
    console.error(e);
  }
  
}
function checkOptionKu01(id, item) {
  // console.log(item);
  if (id > 2) {
    if (item.attribute_style !== undefined) {
      return item.attribute_style.toUpperCase();
    } else if (item.attribute_styles) {
      return item.attribute_styles.toUpperCase();
    } else {
      return item.attribute_model.toUpperCase();
    }
  } else if (id > 1) {
    if (item.attribute_material !== undefined) {
      return item.attribute_material.toUpperCase();
    } else if (item.attribute_color !== undefined) {
      return item.attribute_color.toUpperCase();
    } else {
      return item.attribute_size.toUpperCase();
    }
  } else {
    return item.attribute_size.toUpperCase();
  }
}
function checkOptionKu02(id, item) {
  if (id > 2) {
    return item.attribute_color.toUpperCase();
  } else if (id > 1) {
    return item.attribute_size.toUpperCase();
  } else {
    return "";
  }
}

function variantsNumber(item) {
  const Item = Object.keys(item).length;
  return Item;
}
function OptionGo(item) {
  const Item = item.charAt(0).toUpperCase() + item.slice(1);
  return Item;
}
function CheckImgKu(img) {
  const arr = [];
  arr.push(img);
  return arr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
