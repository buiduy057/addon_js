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
  window.location.href.indexOf("https://www.soobek.com") > -1 ||
  window.location.href.indexOf("https://soobek.com") > -1
) {
  var url_string = window.location.href;
  const category = url_string.slice(
    url_string.lastIndexOf("/") + 1,
    url_string.length
  );
  if (window.location.href.indexOf(`/${category}`) > -1) {
    $(window).ready(function () {
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const one = Number(page) - 1;
          const urlRequest = `${url_string}`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const variants = body.match(/var globalStorefrontJson =(.*?)};/);
          const variantJson = JSON.parse(variants[1] + "}");
          const key = variantJson.key;
          // console.log(key);
          const rqProduct = await fetch(
            ` https://soobek.com/api/storefrontpage/${key}/campaigns?cursor=${one}&limit=40`
          );
          // console.log(rqProduct);
          const bodyProduct = await rqProduct.json();
          // console.log(bodyProduct);
          for (const item of bodyProduct.results) {
            const path = item.path;
            urlProducts.push(`https://soobek.com/${path}`);
          }
          const urlsUnique = [...new Set(urlProducts)];

          for (const path of urlsUnique) {
            try {
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const variantsPath = bodyPath.match(
                /var globalCampaign = (.*?)};/
              );
              const variantData = JSON.parse(variantsPath[1] + "}");
              const stringify = JSON.stringify(variantData);
              let dataProduct_02 = stringify.replace(/@id/gi, "id");
              let dataProduct_03 = dataProduct_02.replace(/@ref/gi, "id");
              const dataPath = JSON.parse(dataProduct_03);
              // console.log(dataPath);

              const title = $(bodyPath)
                .find(".desktop-product-title h1.campaign-name-title")
                .text();
              // console.log(title);
              const description = dataPath.description;
              const images_arr = [];
              const font = dataPath.featured.mockupUrl;
              images_arr.push(font);
              const size_arr = [];
              let option3_name = "";
              for (const item of dataPath.variants) {
                for (const color of item.colors) {
                  for (const size of color.sizes) {
                    if (size.name !== undefined) {
                      const itemSize = {
                        id: size.id,
                        name: size.name,
                        value: size.surcharge.amount,
                      };
                      size_arr.push(itemSize);
                    }
                  }
                }
              }
              let i = 1;
              let variantsItems = [];
              for (const item of dataPath.variants) {
                const variant = {
                  option1: item.name,
                  shipping_cost: 0,
                  quantity: 9999,
                  origin_price: true,
                };
                if (item.colors.length) {
                  for (const color of item.colors) {
                    const variant1 = {
                      ...variant,
                      hex: `${color.hex}`,
                      option2: color.name,
                      var_images: Object.keys(color.images).length
                        ? CheckImgSo(color.images)
                        : [],
                    };

                    if (color.sizes.length > 2) {
                      option3_name = "Sizes";
                      for (const size of color.sizes) {
                        const variant2 = {
                          ...variant1,
                          sku: `Soobek_${i}`,
                          price:
                            CheckPriceSoo(item.price.str, size.id, size_arr) -
                            1,
                          option3: CheckOptionSizeSo(size.id, size_arr),
                        };
                        i++;
                        variantsItems.push(variant2);
                      }
                    } else {
                      option3_name = "";
                      const variant2 = {
                        ...variant1,
                        price: Number(item.price.str) - 1,
                        option3: "One Size",
                      };
                      variantsItems.push(variant2);
                      i++;
                    }
                  }
                } else {
                  const variant1 = {
                    ...variant,
                    sku: `Soobek_${i}`,
                    price: Number(item.price.str) - 1,
                  };
                  variantsItems.push(variant1);
                }
              }
              let listCate = ["GRADUATION'S DAY"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = `swordart.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `swordart_soobek`;
              product["vender_url"] = path;
              product["description"] = description;
              product["images"] = variantsItems[0].var_images.length
                ? variantsItems[0].var_images
                : images_arr;
              product["variants"] = variantsItems;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = CheckTags(listCate);
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = 1;
              product["option1_name"] = "Styles";
              product["option2_name"] = dataPath.variants[0].colors.length
                ? "Colors"
                : "Sizes";
              product["option3_name"] = option3_name;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `swordart_soobek`);
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
function CheckImgSo(item) {
  const img = [];
  img.push(item.FRONT);
  img.push(item.BACK);
  return img;
}
function CheckOptionSizeSo(id, arr) {
  for (const item of arr) {
    if (id === item.id) {
      return item.name;
    }
  }
}
function CheckPriceSoo(price, id, arr) {
  for (const item of arr) {
    if (id === item.id) {
      if (item.value > 0) {
        return Number(price) + Number(item.value) / 100;
      } else {
        return Number(price);
      }
    }
  }
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
