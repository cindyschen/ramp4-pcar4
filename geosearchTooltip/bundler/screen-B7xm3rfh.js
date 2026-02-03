import { defineComponent as T, computed as x, resolveDirective as k, createElementBlock as s, openBlock as o, createElementVNode as r, withKeys as A, unref as u, normalizeClass as F, withModifiers as K, withDirectives as S, createCommentVNode as L, createTextVNode as C, inject as j, ref as M, onBeforeMount as H, watch as O, onBeforeUnmount as I, toDisplayString as y, Fragment as P, renderList as N, onMounted as Z, renderSlot as Q, resolveComponent as X, createBlock as z, withCtx as B, createVNode as V } from "vue";
import { h as E, a as J, G as W, _ as Y, N as ee, O as te, Q as G, V as q } from "./main-D_QprKlv.js";
import "@arcgis/core/Color";
import "@arcgis/core/config";
import "@arcgis/core/core/reactiveUtils.js";
import "@arcgis/core/geometry/Extent";
import "@arcgis/core/geometry/Multipoint";
import "@arcgis/core/geometry/Point";
import "@arcgis/core/geometry/Polygon";
import "@arcgis/core/geometry/Polyline";
import "@arcgis/core/geometry/SpatialReference";
import "@arcgis/core/geometry/support/jsonUtils";
import "@arcgis/core/Graphic";
import "@arcgis/core/request";
import "@arcgis/core/symbols/PictureMarkerSymbol";
import "@arcgis/core/symbols/SimpleFillSymbol";
import "@arcgis/core/symbols/SimpleLineSymbol";
import "@arcgis/core/symbols/SimpleMarkerSymbol";
import "@arcgis/core/symbols/support/jsonUtils";
import "@arcgis/map-components/components/arcgis-swipe";
import "deepmerge";
import "@terraformer/spatial";
import "proj4";
import { debounce as U } from "throttle-debounce";
import { useI18n as R } from "vue-i18n";
import "pinia";
import "screenfull";
import "lodash-es";
import "vue-tippy";
import "linkify-html";
import "@popperjs/core";
import "@terraformer/arcgis";
import "csv2geojson";
import "redaxios";
import oe from "await-to-js";
import "svg.js";
const re = { class: "rv-geosearch-bar relative h-26 mx-8 mb-8" }, se = ["placeholder", "value", "aria-label"], ne = { class: "absolute inset-y-0 right-8 grid w-10 place-content-center" }, ae = ["aria-label", "content"], ie = /* @__PURE__ */ T({
  __name: "search-bar",
  setup($) {
    const { t: n } = R(), c = E(), a = J(), f = x(() => c.searchVal), m = x(
      () => ['"', "$", "!", "*", "+", "?", "^", "{", "}", "(", ")", "|", "[", "]"].filter((v) => c.searchVal.includes(v)).join("")
    ), _ = (v) => {
      c.setSearchTerm(v), c.setSearchRegex(v);
    }, h = U(500, (v) => {
      _(v);
    });
    return (v, e) => {
      const i = k("tippy");
      return o(), s("div", re, [
        r("input", {
          type: "text",
          class: F(["border-b w-full text-base py-8 outline-none focus:shadow-outline border-gray-600 h-full min-w-0", { "border-yellow-500": m.value }]),
          placeholder: u(n)("geosearch.searchText"),
          value: f.value,
          onInput: e[0] || (e[0] = (t) => u(h)(t.target.value)),
          onKeyup: e[1] || (e[1] = A((t) => {
            u(a).mobileView && t.target.blur();
          }, ["enter"])),
          "aria-label": u(n)("geosearch.searchText"),
          onKeypress: e[2] || (e[2] = A(K(() => {
          }, ["prevent"]), ["enter"])),
          enterkeyhint: "done"
        }, null, 42, se),
        r("span", ne, [
          m.value ? S((o(), s("button", {
            key: 0,
            class: "cursor-default",
            "aria-label": u(n)("geosearch.badChars", { chars: m.value }),
            content: u(n)("geosearch.badChars", { chars: m.value })
          }, e[3] || (e[3] = [
            C(" ⚠ ")
          ]), 8, ae)), [
            [i]
          ]) : L("", !0)
        ])
      ]);
    };
  }
}), le = { class: "rv-geosearch-top-filters sm:flex items-center w-full ml-8 mb-14" }, ce = { class: "w-fit inline-block sm:w-1/2 h-26 mb-8 sm:mb-0 pr-16 sm:pr-0" }, pe = ["value", "aria-label"], ue = {
  value: "",
  disabled: "",
  hidden: ""
}, de = { class: "sm:w-1/2 h-26 sm:mx-16 flex" }, me = ["value", "aria-label"], he = {
  value: "",
  disabled: "",
  hidden: ""
}, ve = ["disabled", "content", "aria-label"], be = /* @__PURE__ */ T({
  __name: "top-filters",
  setup($) {
    const { t: n } = R(), c = j("iApi"), a = E(), f = M([]), m = M([]), _ = M([]), h = x(() => a.queryParams), v = x(() => c.language), e = (d) => a.setProvince(d), i = (d) => a.setType(d), t = () => {
      e({}), i({});
    }, w = () => {
      a.initService(c.language, c.fixture.get("geosearch").config);
      const d = f.value.find((p) => h.value.province === p.name)?.code, b = m.value.find((p) => h.value.type === p.name)?.code;
      a.getProvinces.then((p) => {
        f.value = p, e({
          province: p.find((l) => l.code === d)?.name,
          forceReRun: !0
        });
      }), a.getTypes.then((p) => {
        m.value = p, i({
          type: p.find((l) => l.code === b)?.name,
          forceReRun: !0
        });
      });
    };
    return H(() => {
      w(), _.value.push(O(v, w));
    }), I(() => {
      _.value.forEach((d) => d());
    }), (d, b) => {
      const p = k("tippy");
      return o(), s("div", le, [
        r("div", ce, [
          r("select", {
            class: "border-b border-b-gray-600 w-full h-full py-0 cursor-pointer pr-24 truncate",
            value: h.value.province,
            "aria-label": u(n)("geosearch.filters.province"),
            onChange: b[0] || (b[0] = (l) => e({
              province: l.target.value
            }))
          }, [
            r("option", ue, y(u(n)("geosearch.filters.province")), 1),
            (o(!0), s(P, null, N(f.value, (l) => (o(), s("option", {
              key: l.code
            }, y(l.name), 1))), 128))
          ], 40, pe)
        ]),
        r("div", de, [
          r("select", {
            class: "border-b border-b-gray-600 w-full h-full py-0 cursor-pointer max-w-150 pr-24 truncate",
            value: h.value.type,
            "aria-label": u(n)("geosearch.filters.type"),
            onChange: b[1] || (b[1] = (l) => i({
              type: l.target.value
            })),
            truncate: ""
          }, [
            r("option", he, y(u(n)("geosearch.filters.type")), 1),
            (o(!0), s(P, null, N(m.value, (l) => (o(), s("option", {
              key: l.code
            }, y(l.name), 1))), 128))
          ], 40, me),
          S((o(), s("button", {
            type: "button",
            class: "text-gray-500 w-1/8 h-24 pl-8 pr-16 sm:pr-8 hover:text-black disabled:cursor-default disabled:text-gray-400",
            disabled: !h.value.type && !h.value.province,
            onClick: t,
            content: u(n)("geosearch.filters.clear"),
            "aria-label": u(n)("geosearch.filters.clear")
          }, b[2] || (b[2] = [
            r("div", { class: "rv-geosearch-icon" }, [
              r("svg", {
                class: "fill-current w-18 h-18",
                viewBox: "0 0 23 21"
              }, [
                r("path", { d: "M 14.7574,20.8284L 17.6036,17.9822L 14.7574,15.1716L 16.1716,13.7574L 19.0178,16.568L 21.8284,13.7574L 23.2426,15.1716L 20.432,17.9822L 23.2426,20.8284L 21.8284,22.2426L 19.0178,19.3964L 16.1716,22.2426L 14.7574,20.8284 Z M 2,2L 19.9888,2.00001L 20,2.00001L 20,2.01122L 20,3.99999L 19.9207,3.99999L 13,10.9207L 13,22.909L 8.99999,18.909L 8.99999,10.906L 2.09405,3.99999L 2,3.99999L 2,2 Z " })
              ])
            ], -1)
          ]), 8, ve)), [
            [p, { placement: "bottom" }]
          ])
        ])
      ]);
    };
  }
}), fe = { class: "rv-geosearch-bottom-filters" }, _e = { class: "bg-white" }, ge = { class: "ml-8 cursor-pointer font-normal" }, ye = ["checked"], xe = /* @__PURE__ */ T({
  __name: "bottom-filters",
  setup($) {
    const { t: n } = R(), c = j("iApi"), a = E(), f = x(() => a.resultsVisible), m = U(300, (e) => {
      h(e).then((i) => {
        _({
          extent: i,
          visible: f.value
        });
      });
    }), _ = (e) => {
      a.setMapExtent(e);
    }, h = async (e) => e.sr.wkid === 4326 ? e : await c.geo.proj.projectGeometry(4326, e), v = (e) => {
      h(c.geo.map.getExtent()).then((i) => {
        _({
          extent: i,
          visible: e
        });
      });
    };
    return Z(() => {
      c.event.on(W.MAP_EXTENTCHANGE, m, "geosearch_map_extent");
    }), I(() => {
      c.event.off("geosearch_map_extent");
    }), (e, i) => (o(), s("div", fe, [
      r("div", _e, [
        r("label", ge, [
          r("input", {
            type: "checkbox",
            class: "border-2 mx-8 border-gray-600 cursor-pointer",
            checked: f.value,
            onChange: i[0] || (i[0] = (t) => v(t.target.checked)),
            onKeypress: i[1] || (i[1] = A(K(() => {
            }, ["prevent"]), ["enter"]))
          }, null, 40, ye),
          C(y(u(n)("geosearch.visible")), 1)
        ])
      ])
    ]));
  }
}), we = {}, Le = { class: "w-full h-6 relative overflow-hidden rounded-full indeterminate mb-14" }, $e = {
  class: "h-full progressbar bg-blue-800 rounded-full top-0",
  "aria-valuemin": "0",
  "aria-valuemax": "100"
}, ke = { class: "flex items-center h-full" };
function Se($, n) {
  return o(), s("div", Le, [
    r("div", $e, [
      r("span", ke, [
        Q($.$slots, "default", {}, void 0, !0)
      ])
    ])
  ]);
}
const Ce = /* @__PURE__ */ Y(we, [["render", Se], ["__scopeId", "data-v-0a8d1c36"]]), Te = { class: "flex flex-col h-full" }, Ee = {
  key: 1,
  class: "text-red-900 text-xs px-8 mb-10"
}, Re = {
  key: 2,
  class: "px-8 mb-10 py-8 flex-grow text-wrap border-y border-gray-600 overflow-y-auto"
}, Me = { class: "relative h-48" }, Ve = { class: "font-bold text-blue-600" }, Ae = {
  key: 3,
  class: "rv-results-list flex-grow mb-5 border-t border-b border-gray-600 overflow-y-auto"
}, Pe = ["onClick"], Ne = { class: "rv-result-description px-8" }, je = { class: "flex-1 text-left truncate font-bold leading-tight" }, ze = ["innerHTML"], Be = {
  key: 0,
  class: "text-gray-600 text-sm"
}, Ge = {
  key: 1,
  class: "hidden"
}, qe = {
  key: 2,
  class: "text-sm font-normal"
}, $t = /* @__PURE__ */ T({
  __name: "screen",
  props: {
    panel: {
      type: Object
    }
  },
  setup($) {
    const { t: n } = R(), c = j("iApi"), a = E(), f = x(() => a.searchVal.replace(/["!*$+?^{}()|[\]\\]/g, "").trim()), m = x(() => a.searchResults), _ = x(() => a.loadingResults), h = x(() => a.failedServices), v = x(() => a.GSservice.config.fsaUrl), e = async (t) => {
      if (t.flav === "fsa" && v.value) {
        const d = v.value.replace(ee, t.name), [b, p] = await oe(te(d));
        if (!b) {
          const l = new G(
            "fsazoom",
            p.features[0].geometry.rings,
            q.fromConfig(p.spatialReference),
            // technically not from a config, but config follows esri spec. this server result is raw, does not have esri class wrapper
            !0
          );
          c.geo.map.zoomMapTo(l);
          return;
        }
      }
      const w = new G(
        "zoomies",
        [
          [
            [t.bbox[0], t.bbox[1]],
            [t.bbox[0], t.bbox[3]],
            [t.bbox[2], t.bbox[3]],
            [t.bbox[2], t.bbox[1]],
            [t.bbox[0], t.bbox[1]]
          ]
        ],
        q.latLongSR(),
        !0
      );
      c.geo.map.zoomMapTo(w);
    }, i = (t, w) => {
      const d = t.replace(
        new RegExp(`${a.searchRegex}`, "gi"),
        (b) => '<span class="font-bold text-blue-600">' + b + "</span>"
      );
      return w ? d + "," : d;
    };
    return (t, w) => {
      const d = X("panel-screen"), b = k("truncate"), p = k("focus-item"), l = k("focus-list");
      return o(), z(d, { panel: $.panel }, {
        header: B(() => [
          C(y(u(n)("geosearch.title")), 1)
        ]),
        content: B(() => [
          r("div", Te, [
            V(ie),
            V(be),
            _.value ? (o(), z(Ce, {
              key: 0,
              class: "flex-none"
            })) : L("", !0),
            h.value.length > 0 && !_.value ? (o(), s("div", Ee, y(u(n)("geosearch.serviceError", {
              services: h.value.join(", ")
            })), 1)) : L("", !0),
            f.value && m.value.length === 0 && !_.value ? (o(), s("div", Re, [
              r("span", Me, [
                C(y(u(n)("geosearch.noResults")), 1),
                r("span", Ve, '"' + y(f.value) + '"', 1)
              ])
            ])) : L("", !0),
            m.value.length > 0 ? S((o(), s("ul", Ae, [
              (o(!0), s(P, null, N(m.value, (g, D) => (o(), s("li", {
                class: "relative h-56",
                key: D
              }, [
                S((o(), s("button", {
                  type: "button",
                  class: "absolute inset-0 h-full w-full hover:bg-gray-300 default-focus-style",
                  onClick: (Ke) => e(g),
                  style: { "border-bottom": "1px solid lightgray" },
                  "truncate-trigger": ""
                }, [
                  r("div", Ne, [
                    S((o(), s("div", je, [
                      r("span", {
                        innerHTML: i(g.name, g.location.province)
                      }, null, 8, ze),
                      g.location.province ? (o(), s("span", Be, y(g.location.city ? " " + g.location.city + ", " + g.location.province.abbr : " " + g.location.province.abbr), 1)) : L("", !0),
                      g.type ? (o(), s("span", Ge, "; ")) : L("", !0),
                      g.type ? (o(), s("span", qe, [
                        w[0] || (w[0] = r("br", null, null, -1)),
                        C(y(g.type), 1)
                      ])) : L("", !0)
                    ])), [
                      [b, {
                        externalTrigger: !0,
                        options: { placement: "top-start" }
                      }]
                    ])
                  ])
                ], 8, Pe)), [
                  [p, "show-truncate"]
                ])
              ]))), 128))
            ])), [
              [l]
            ]) : L("", !0),
            V(xe, { class: "mt-auto" })
          ])
        ]),
        _: 1
      }, 8, ["panel"]);
    };
  }
});
export {
  $t as default
};
