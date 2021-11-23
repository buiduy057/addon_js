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
  window.location.href.indexOf("https://www.tonan.shop") > -1 ||
  window.location.href.indexOf("https://tonan.shop") > -1
) {
  $(window).ready(function () {
    var url_string = window.location.href;
    async function getPage(page = 300) {
      try {
        let urlProducts = [];
        console.log(`page=${page}`);
        const urlRequest = `${url_string}/page/${page}/`;
        const rq = await fetch(urlRequest);
        const body = await rq.text();
        const productItem = $(body).find(
          ".shop-container .products .image-fade_in_back a"
        );
        $(productItem).each(function (_, item) {
          urlProducts.push($(item).attr("href"));
        });
        const urlsUnique = [...new Set(urlProducts)];
        // console.log(urlsUnique);

        for (const path of urlsUnique) {
          try {
            // console.log(path);
            const rqPath = await fetch(path);
            const bodyPath = await rqPath.text();
            const variantsPath = bodyPath.match(/variations =(.*?)];/);
            const dataVarr = JSON.parse(variantsPath[1] + "]");
            console.log(dataVarr);
            // const dataVarr = jsonData.data[0].productDetail.variants;
            // const Data = jsonData.data[0].productDetail;
            const title = $(bodyPath).find("h1.product_title").text();
            const description = $(bodyPath).find("#tab-description").html();
            let option1_picture = 0;
            if (dataVarr[0].attributes !== undefined) {
              if (dataVarr[0].attributes.length > 2) option1_picture = 1;
              const optionName = CheckOptionName(dataVarr[0].attributes);
              let i = 1;
              let variantsItems = [];
              // break
              for (const item of dataVarr) {
                const variant = {
                  sku: `Tonan_${i}`,
                  shipping_cost: 0,
                  var_images: [item.image],
                  price: item.regular_price - 1,
                  quantity: 9999,
                  origin_price: true,
                };
                let k = 1;
                for (let countFor = 0; countFor <= 1; countFor++) {
                  for (const itemOption of item.attributes) {
                    if (countFor === 0) {
                      if (itemOption.name.indexOf("Style") > -1) {
                        variant[`option${k}`] = itemOption.option;
                        k += 1;
                      }
                    } else {
                      if (itemOption.name.indexOf("Style") === -1) {
                        variant[`option${k}`] = itemOption.option;
                        k += 1;
                      }
                    }
                  }
                }
                variantsItems.push(variant);
                i++;
              }
              console.log(variantsItems);
              let listCate = ["SHIRTS"];
              tit = title + " " + makeid(10);
              product = {
                ...optionName,
              };
              ggcate = filterCategory(tit);
              product["domain"] = `bizu.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `bizu_zemashirt`;
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = variantsItems[0].var_images;
              product["variants"] = variantsItems;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = "Shirts";
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = option1_picture;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              console.log(JSON.stringify(product));
              break;
            }

            // send(product, `bizu_zemashirt`);
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
function CheckOptionName(arr) {
  const optionName = {};
  let j = 1;
  for (let countFor = 0; countFor <= 1; countFor++) {
    for (const item of arr) {
      if (countFor === 0) {
        if (item.name.indexOf("Style") > -1) {
          optionName[`option${j}_name`] = item.name;
          j += 1;
        }
      } else {
        if (item.name.indexOf("Style") === -1) {
          optionName[`option${j}_name`] = item.name;
          j += 1;
        }
      }
    }
  }
  return optionName;
}

function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
