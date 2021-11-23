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
      chrome.storage.local.clear();
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
let dataRequest;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(request);
  if (request.message === "data") {
    dataRequest = request.data;
    // console.log(request.data);
    getPage();
  }
});
var url_string = window.location.href;
async function getPage(page = `${dataRequest.page}`) {
  try {
    // console.log(dataRequest);
    let urlProducts = [];
    console.log(`page=${page}`);
    const urlRequest = `${url_string}page/${page}/`;
    const rq = await fetch(urlRequest);
    const body = await rq.text();
    // const ItemHref = $(body).find(`${dataRequest.css_selector}`);
    const ItemHref = $(body).find(`${dataRequest.css_selector}`);
    $(ItemHref).each(function (_, item) {
      urlProducts.push($(item).attr("href"));
    });
    const urlsUnique = [...new Set(urlProducts)];
    for (const path of urlsUnique) {
      try {
        const rqPath = await fetch(path);
        const bodyPath = await rqPath.text();
        const variants = $(bodyPath)
          .find("form.cart")
          .attr("data-product_variations");
        const optionName = {};
        const dataVariants = JSON.parse(variants);

        // console.log(dataVariants);
        let title = $(bodyPath).find("#content  h2.product_title").text();
        let tags = "Hunting,Fishing,Camping";
        let description = $(bodyPath)
          .find("#tab-description img")
          .remove()
          .html();
        let images_arr = [];
        const itemImg = $(bodyPath).find(
          ".product-thumbs-slider .img-thumbnail img"
        );
        $(itemImg).each(function (_, item) {
          images_arr.push($(item).attr("src"));
        });
        let j = 1;
        const itemSelect = $(bodyPath).find("form.cart select");
        for (let countFor = 0; countFor <= 1; countFor++) {
          $(itemSelect).each(function (_, item) {
            const Item = $(item).attr("id");
            if (countFor === 0) {
              if (Item.indexOf("pa_style") > -1) {
                optionName[`option${j}_name`] = OptionHuName(
                  $(item).attr("id")
                );
                j += 1;
              }
            } else {
              if (Item.indexOf("pa_style") === -1) {
                optionName[`option${j}_name`] = OptionHuName(
                  $(item).attr("id")
                );
                j += 1;
              }
            }
          });
        }
        const id = $(bodyPath).find("form.cart").attr("data-product_id");
        const varr_01 = [];
        const Item01 = $(bodyPath).find(
          `#pa_${optionName.option1_name.toLowerCase()} option`
        );
        $(Item01).each(function (_, item) {
          const Item = $(item).attr("value");
          if (Item !== "") {
            varr_01.push(Item);
          }
        });
        const varr_02 = [];
        const option2 =
          optionName.option2_name.indexOf("Size") !== -1
            ? optionName.option2_name
            : optionName.option3_name;

        const Item02 = $(bodyPath).find(`#pa_${option2.toLowerCase()} option`);
        $(Item02).each(function (_, item) {
          const Item = $(item).attr("value");
          if (Item !== "") {
            varr_02.push(Item);
          }
        });
        // console.log(varr_02);
        const dataVarr = dataVariants !== false ? dataVariants : varr_01;
        let variants_arr = [];
        for (const item of dataVarr) {
          for (const size of varr_02) {
            if (dataVariants === false) {
              // console.log(item);
              const formData = new FormData();
              formData.append("attribute_pa_style", item);
              formData.append("attribute_pa_size", size);
              formData.append("product_id", id);
              await fetch("https://huntbeus.com/?wc-ajax=get_variation", {
                method: "POST",
                body: formData,
              })
                .then((response) => response.json())
                .then((data) => {
                  const dataI = data;
                  if (dataI !== false) {
                    const itemVariant = {
                      sku: dataI.sku,
                      var_images: CheckImgHu(dataI.image.full_src),
                      price: Number(dataI.display_price) - 1,
                      origin_price: true,
                      shipping_cost: 0,
                      quantity: 9999,
                    };
                    let i = 1;
                    for (let countFor = 0; countFor <= 1; countFor++) {
                      for (const option in dataI.attributes) {
                        if (countFor === 0) {
                          if (option.indexOf("pa_style") > -1) {
                            itemVariant[`option${i}`] = OptionHuName(
                              dataI.attributes[option]
                            );
                            i += 1;
                          }
                        } else {
                          if (option.indexOf("pa_style") === -1) {
                            itemVariant[`option${i}`] =
                              dataI.attributes[option] !== ""
                                ? dataI.attributes[option].toUpperCase()
                                : size.toUpperCase();
                            i += 1;
                          }
                        }
                      }
                    }
                    variants_arr.push(itemVariant);
                  }
                });
            } else {
              const itemVariant = {
                sku: item.sku,
                var_images: CheckImgHu(item.image.full_src),
                price: Number(item.display_price) - 1,
                origin_price: true,
                shipping_cost: 0,
                quantity: 9999,
              };
              let j = 1;
              for (let countFor = 0; countFor <= 1; countFor++) {
                for (const option in dataVariants[0].attributes) {
                  if (countFor === 0) {
                    if (option.indexOf("pa_style") > -1) {
                      itemVariant[`option${j}`] = OptionHuName(
                        item.attributes[option]
                      );
                      j += 1;
                    }
                  } else {
                    if (option.indexOf("pa_style") === -1) {
                      itemVariant[`option${j}`] =
                        item.attributes[option] !== ""
                          ? item.attributes[option].toUpperCase()
                          : size.toUpperCase();
                      j += 1;
                    }
                  }
                }
              }
              variants_arr.push(itemVariant);
            }
          }
        }
        // console.log(variants_arr);
        let listCate = ["HUNTING"];
        tit = title + " " + makeid(10);
        product = {
          ...optionName,
        };
        ggcate = filterCategory(tit);
        product["domain"] = `${dataRequest.domain}`;
        product["title"] = title + " " + makeid(10);
        product["categories"] = listCate;
        product["paybal"] = Number(`${dataRequest.paybal}`);
        product["google_category"] = ggcate;
        product["gender"] = "All";
        product["vender"] = `${dataRequest.vender}`;
        product["vender_url"] = path;
        product["description"] = "";
        product["images"] = images_arr;
        product["variants"] = variants_arr;
        product["designed"] = -1;
        product["trending"] = trending === true ? 1 : 0;
        product["feedback"] = null;
        product["tags"] = tags;
        product["rank"] = null;
        product["vender_id"] = path;
        product["specifics"] = null;
        product["option1_picture"] = 1;
        product["delivery_date_min"] = 5;
        product["delivery_date_max"] = 20;
        product["shipping_service_name"] = "Economy Shipping";
        product["location"] = "USA";
        // console.log(JSON.stringify(product));
        send(product, `${dataRequest.vender}`);
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

function OptionHuName(item) {
  const Item = item.lastIndexOf("_");
  const ItemN = item.slice(Item + 1, item.length);
  const ItemChat = ItemN.charAt(0).toUpperCase() + ItemN.slice(1);
  return ItemChat;
}
function OptionHu(item) {
  return Item;
}
function CheckImgHu(img) {
  const arr = [];
  arr.push(img);
  return arr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
