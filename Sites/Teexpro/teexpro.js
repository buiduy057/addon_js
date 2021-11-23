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
  window.location.href.indexOf("https://www.teexpro.store") > -1 ||
  window.location.href.indexOf("https://teexpro.store") > -1
) {
  console.log("ok");

  $(window).ready(function () {
    var url_string = window.location.href;
    async function getPage(page = 7000) {
      try {
        let urlProducts = [];
        console.log(`page=${page}`);
        if (page === 2500) return;
        const urlRequest = `${url_string}&page=${page}`;
        const rq = await fetch(urlRequest);
        const body = await rq.text();
        const productItem = $(body).find(
          ".m-container .desktop-more-products .item-product a"
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
            const variantsPath = bodyPath.match(
              /window\.__NUXT__=(.*?);<\/script>/
            );
            eval(`var jsonData = ${variantsPath[1]};`);
            // console.log(jsonData);
            const dataVarr = jsonData.data[0].productDetail.styles;
            const title = $(bodyPath).find(".size-sku-product h1").text();
            const productId = jsonData.data[0].productDetail.productId;
            const bucketName = jsonData.data[0].productDetail.bucketName;
            // console.log(dataVarr);
            let option1_name = "";
            let option2_name = "";
            let option3_name = "";
            let option1_picture = 0;
            let i = 1;
            let variantsItems = [];
            for (const item of dataVarr) {
              const variant = {
                sku: `Teexpro_${i}`,
                option1: item.name,
                shipping_cost: 0,
                quantity: 9999,
                origin_price: true,
              };
              if (item.sizes.length && item.colors) {
                option1_picture = 1;
                option1_name = "Styles";
                option2_name = "Colors";
                option3_name = "Sizes";
                for (const color of item.colors) {
                  for (const size of item.sizes) {
                    const variant1 = {
                      ...variant,
                      option2: color.name,
                      option3: size.name,
                      price: CheckPriceTee(size.price, item.price) - 1,
                      var_images: checkImgTee(
                        bucketName,
                        item.styleId,
                        productId,
                        color.code,
                        item.rect
                      ),
                    };
                    variantsItems.push(variant1);
                  }
                }
              } else if (item.sizes.length) {
                option1_picture = 1;
                option1_name = "Styles";
                option3_name = "Sizes";
                for (const size of item.sizes) {
                  const variant1 = {
                    ...variant,
                    option3: size.name,
                    price: CheckPriceTee(size.price, item.price) - 1,
                  };
                  variantsItems.push(variant1);
                }
              } else if (item.colors.length) {
                option1_picture = 1;
                option1_name = "Styles";
                option2_name = "Colors";
                const variant1 = {
                  ...variant,
                  option2: color.name,
                  var_images: checkImgTee(
                    item.styleId,
                    productId,
                    color.code,
                    item.rect
                  ),
                };
                variantsItems.push(variant1);
              } else {
                option1_picture = 0;
                const variant1 = {
                  ...variant,
                  option2: "",
                  option3: "",
                };
                option1_name = "Styles";
                variantsItems.push(variant1);
              }
              i++;
            }
            // console.log(variantsItems);
            let listCate = ["T-SHIRTS"];
            tit = title + " " + makeid(10);
            product = {};
            ggcate = filterCategory(tit);
            product["domain"] = `bizu.shop`;
            product["title"] = title + " " + makeid(10);
            product["categories"] = listCate;
            product["paybal"] = 1;
            product["google_category"] = ggcate;
            product["gender"] = "All";
            product["vender"] = `bizu_teexpro`;
            product["vender_url"] = path;
            product["description"] = "";
            product["images"] = variantsItems[0].var_images;
            product["variants"] = variantsItems;
            product["designed"] = -1;
            product["trending"] = trending === true ? 1 : 0;
            product["feedback"] = null;
            product["tags"] = "T-Shirts";
            product["rank"] = null;
            product["vender_id"] = path;
            product["specifics"] = null;
            product["option1_picture"] = option1_picture;
            product["option1_name"] = option1_name;
            product["option2_name"] = option2_name;
            product["option3_name"] = option3_name;
            product["delivery_date_min"] = 5;
            product["delivery_date_max"] = 20;
            product["shipping_service_name"] = "Economy Shipping";
            product["location"] = "USA";
            // console.log(JSON.stringify(product));
            send(product, `bizu_teexpro`);
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
function CheckPriceTee(id, price) {
  return Number(id) + Number(price);
}
function checkImgTee(name, styleID, id, code, rect) {
  const styleId = Number(styleID);
  const BACK = `https://images.exshoptee.top/api/images/${name}/${id}/${styleId}-${code}-${rect.back}-BACK/large.jpg`;
  const FRONT = `https://images.exshoptee.top/api/images/${name}/${id}/${styleId}-${code}-${rect.front}-FRONT/large.jpg`;
  const img = [];
  img.push(FRONT);
  img.push(BACK);
  return img;
}
function CheckOptionColor(item) {
  const ItemChat = item.charAt(0).toUpperCase() + item.slice(1);
  return ItemChat;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
