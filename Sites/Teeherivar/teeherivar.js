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
  window.location.href.indexOf("https://www.teeherivar.com") > -1 ||
  window.location.href.indexOf("https://teeherivar.com") > -1
) {
  if (window.location.href.indexOf("/product-tag/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 201) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}page/${page}/`;
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".category-page-row .image-none a");
          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(data);

          for (const path of urlsUnique) {
            try {
              //     // console.log(path);
              const rqPath = await fetch(path);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath)
                .find(".product-info  h1.product-title ")
                .text();
              const description = $(bodyPath).find("#tab-description").html();
              let imageThub = [];
              let imageitem = $(bodyPath).find(
                ".shop-container .woocommerce-product-gallery__image img"
              );
              $(imageitem).each(function (_, item) {
                imageThub.push($(item).attr("src"));
              });

              const dataPrice = $(bodyPath)
                .find("form.cart .wcpa_form_outer")
                .attr("data-product");
              const dataPriceJson = JSON.parse(dataPrice);
              const price = dataPriceJson.wc_product_price;
              const optionName = [];
              const itemOption = $(bodyPath).find(
                ".wcpa_form_outer .wcpa_row .wcpa_form_item > label"
              );
              $(itemOption).each(function (_, item) {
                const Item = $(item).text();
                optionName.push(CheckOptionTe(Item));
              });
              const itemOptionName = [...new Set(optionName)];
              // console.log(itemOptionName);
              const type_arr = [];
              const itemtype = $(bodyPath).find(
                `.wcpa_type_image-group .wcpa_image`
              );
              $(itemtype).each(function (_, item) {
                const Item01 = $(item).find("input").attr("data-price");
                const ItemPrice = JSON.parse(Item01);
                const valuePrice = ItemPrice.value;
                const Item02 = $(item).find("img").attr("src");
                const Item03 = $(item).find("p.wcpa_image_desc").text().trim();

                const itemV = {
                  image: Item02,
                  value: Item03,
                  price: valuePrice,
                };
                type_arr.push(itemV);
              });
              let color_arr = [
                { value: "Black", hex: "000000" },
                { value: "Brown", hex: "68381a" },
                { value: "Dark Grey", hex: "333333" },
                { value: "Forest", hex: "2d391c" },
                { value: "Green", hex: "399548" },
                { value: "Hot Pink", hex: "fb2360" },
                { value: "Light Pink", hex: "ffbbd3" },
                { value: "Light Blue", hex: "c3e2f1" },
                { value: "Maroon", hex: "470009" },
                { value: "Navy Blue", hex: "03031f" },
                { value: "Orange", hex: "ff3e04" },
                { value: "Purple", hex: "433161" },
                { value: "Red", hex: "c10d0f" },
                { value: "Royal Blue", hex: "324e94" },
                { value: "Sports Grey", hex: "ababab" },
                { value: "White", hex: "ffffff" },
                { value: "Yellow", hex: "ffc322" },
              ];
              // console.log(color_arr);
              let size_arr = [
                { value: "S", price: 0 },
                { value: "M", price: 0 },
                { value: "L", price: 0 },
                { value: "XL", price: 0 },
                { value: "XXL", price: 3 },
                { value: "XXXL", price: 3 },
                { value: "XXXXL", price: 4 },
                { value: "XXXXXL", price: 6 },
              ];
              let i = 0;
              const variantsItems = [];
              for (const item of type_arr) {
                const variant = {
                  option1: item.value,
                  shipping_cost: 0,
                  quantity: 9999,
                  origin_price: true,
                  var_images: [item.image],
                };
                if (item.value === "Mug") {
                  const variant1 = {
                    ...variant,
                    sku: `Soobek_${i}`,
                    hex: "000000",
                    option2: "Black",
                    option3: "One Size",
                    price: Number(price) - 1,
                  };
                  variantsItems.push(variant1);
                } else {
                  for (const color of color_arr) {
                    const variant1 = {
                      ...variant,
                      option2: color.value,
                      hex: color.hex,
                    };
                    if (item.value !== "Fabric Face Mask") {
                      for (const size of size_arr) {
                        const variant2 = {
                          ...variant1,
                          sku: `Soobek_${i}`,
                          option3: size.value,
                          price:
                            checkPriceTe(price, item.price, size.price) - 1,
                        };
                        i++;
                        variantsItems.push(variant2);
                      }
                    } else {
                      const variant2 = {
                        ...variant1,
                        sku: `Soobek_${i}`,
                        option3: "One Size",
                        price: checkPriceTeFace(price, item.price) - 1,
                      };
                      i++;
                      variantsItems.push(variant2);
                    }
                  }
                }
              }
              // console.log(variantsItems);
              let listCate = ["MOTHER'S DAY"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = `swordart.shop`;
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["paybal"] = 1;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = `swordart_teeherivar`;
              product["vender_url"] = path;
              product["description"] = "";
              product["images"] = imageThub;
              product["variants"] = variantsItems;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = CheckTags(listCate);
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_picture"] = 1;
              product["option1_name"] = itemOptionName[0];
              product["option2_name"] = itemOptionName[1];
              product["option3_name"] = itemOptionName[2];
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              send(product, `swordart_teeherivar`);
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
function CheckTags(item) {
  const ItemN = item[0].toLowerCase();
  const ItemChat = ItemN.charAt(0).toUpperCase() + ItemN.slice(1);
  return ItemChat;
}
function checkPriceTeFace(item, price) {
  const Price = Number(item) + Number(price);
  return Price;
}
function checkPriceTeMug(item, price, price1) {
  let Price;
  switch (item) {
    case "11oz":
      Price = Number(price) + Number(price1);
      break;
    case "15oz":
      Price = Number(price) + Number(price1) + 2;
      break;
    default:
  }
  return Price;
}
function checkPriceTe(item, price, price1) {
  const Price = Number(item) + Number(price) + Number(price1);
  return Price;
}
function CheckOptionTe(item) {
  const Item = item.replace("*", "");
  return Item;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
