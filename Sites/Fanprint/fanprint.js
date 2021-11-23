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
  window.location.href.indexOf("https://www.fanprint.com") > -1 ||
  window.location.href.indexOf("https://fanprint.com") > -1
) {
  if (window.location.href.indexOf("/licenses/") > -1) {
    $(window).ready(function () {
      var url_string = window.location.href;
      async function getPage(page = 1) {
        try {
          let urlProducts = [];
          console.log(`page=${page}`);
          const urlRequest = `${url_string}?page=${page}`;
          // console.log(urlRequest);
          const rq = await fetch(urlRequest);
          const body = await rq.text();
          const productItem = $(body).find(".main-content .campaign-item a");

          $(productItem).each(function (_, item) {
            urlProducts.push($(item).attr("href"));
          });
          // console.log(urlProducts);
          const urlsUnique = [...new Set(urlProducts)];
          // console.log(urlsUnique);

          for (const path of urlsUnique) {
            try {
              // console.log(path);
              const requestPath = `${path}`;
              const rqPath = await fetch(requestPath);
              const bodyPath = await rqPath.text();
              const title = $(bodyPath)
                .find(".campaign-show__campaign-title")
                .text();
              const tagsT = title.split(" ");
              const tag_arr = [];
              for (const item of tagsT) {
                if (item !== "-") {
                  tag_arr.push(item);
                }
              }
              const tags = tag_arr.toString();
              // console.log(tags);
              const datavariant = $(bodyPath)
                .find(".main-content")
                .children()
                .eq(4)
                .attr("data-react-props");
              const Variant = JSON.parse(datavariant);
              // console.log(Variant);
              let option1_name = "Styles";
              let option2_name = "Dimension";
              // console.log(Variant);
              let variants = [];
              for (const item of Variant.styles) {
                const itemVariant = {
                  option1: item.title,
                  price: item.saleAmount - 2,
                  origin_price: true,
                  var_images: checkImgFar(item.colors[0].pictureUrl),
                };
                for (const itemsize of item.sizes) {
                  const itemVariant2 = {
                    ...itemVariant,
                    option2: checkSize(itemsize.title),
                    shipping_cost: 0,
                    quantity: 9999,
                  };
                  variants.push(itemVariant2);
                }
              }
              console.log(variants);
              let listCate = ["T-SHIRTS"];
              tit = title + " " + makeid(10);
              product = {};
              ggcate = filterCategory(tit);
              product["domain"] = "customray.com";
              product["title"] = title + " " + makeid(10);
              product["categories"] = listCate;
              product["google_category"] = ggcate;
              product["gender"] = "All";
              product["vender"] = "licenses";
              product["vender_url"] = path;
              product["description"] = "";
              product["images"] = variants[0].var_images;
              product["variants"] = variants;
              product["designed"] = -1;
              product["trending"] = trending === true ? 1 : 0;
              product["feedback"] = null;
              product["tags"] = tags;
              product["rank"] = null;
              product["vender_id"] = path;
              product["specifics"] = null;
              product["option1_name"] = option1_name;
              product["option2_name"] = option2_name;
              product["option1_picture"] = 1;
              product["delivery_date_min"] = 5;
              product["delivery_date_max"] = 20;
              product["shipping_service_name"] = "Economy Shipping";
              product["location"] = "USA";
              // console.log(JSON.stringify(product));
              // send(product, "licenses");
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
    });
  }
}
function checkSize(size) {
  // console.log(size);
  const begin = size.indexOf("(");
  if (size.indexOf("(") !== -1) {
    const sizeN = size.slice(0, begin).trim();
    return sizeN;
  }
  if (size.indexOf("+") !== -1) {
    const sizeplus = size.slice(0, size.indexOf("+"));
    return sizeplus.trim();
  } else {
    return size;
  }
}
function checkImgFar(img) {
  const varr = [];
  const beginN = img.lastIndexOf("_");
  const itemN = img.slice(beginN + 1, img.length - 4);
  const begin = img.lastIndexOf("/");
  const itemreplace = img.slice(begin + 1, img.length - 4);
  const imgN = img.replace(itemreplace, itemN);
  varr.push(imgN);
  return varr;
}
function timeOut(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
