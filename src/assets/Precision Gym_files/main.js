(this["webpackJsonpreact-complete-guide"] =
  this["webpackJsonpreact-complete-guide"] || []).push([
  [0],
  {
    22: function (e, t, n) {},
    32: function (e, t, n) {},
    34: function (e, t, n) {},
    35: function (e, t, n) {},
    39: function (e, t, n) {},
    40: function (e, t, n) {},
    41: function (e, t, n) {},
    42: function (e, t, n) {},
    43: function (e, t, n) {},
    44: function (e, t, n) {},
    45: function (e, t, n) {},
    46: function (e, t, n) {
      "use strict";
      n.r(t);
      var r = n(23),
        c = n.n(r),
        a = (n(32), n(13)),
        s = n(2),
        i = n(8),
        o = n(0),
        u = n.n(o),
        l = n(7),
        d = n.n(l),
        j = d.a.createContext({ a: 1, b: 2 }),
        b = (n(34), n(35), n.p + "static/media/PrecisionGym.f2e64648.png"),
        f = n(3);
      function x() {
        return Object(f.jsx)("img", {
          className: "logo",
          src: b,
          alt: "Precision Gym logo",
        });
      }
      var m = n(15),
        p = n(27),
        h = Object(p.a)({
          apiKey: "AIzaSyD144v5e3drXitUMQbSQFdYDKNSv60TDLw",
          authDomain: "precision-gym.firebaseapp.com",
          databaseURL: "https://precision-gym-default-rtdb.firebaseio.com",
          projectId: "precision-gym",
          storageBucket: "precision-gym.appspot.com",
          messagingSenderId: "129767049868",
          appId: "1:129767049868:web:b2c2816d947dc366bdc9a9",
        }),
        g = Object(m.b)(h);
      n(22);
      function O() {
        var e = Object(l.useState)(""),
          t = Object(i.a)(e, 2),
          n = t[0],
          r = t[1],
          c = Object(l.useState)(""),
          a = Object(i.a)(c, 2),
          s = a[0],
          o = a[1],
          u = Object(l.useState)(!1),
          b = Object(i.a)(u, 2),
          x = b[0],
          p = b[1],
          h = d.a.useContext(j);
        return Object(f.jsx)("div", {
          className: "signin-login-container",
          children: Object(f.jsxs)("form", {
            onSubmit: function (e) {
              e.preventDefault(),
                Object(m.d)(g, n, s)
                  .then(function (e) {
                    h.setUser(e.user.displayName);
                  })
                  .catch(function (e) {
                    p(!0), console.log("\ud83d\udca5", e);
                  });
            },
            children: [
              Object(f.jsx)("h2", { children: "Log In to Your Account" }),
              Object(f.jsx)("input", {
                type: "email",
                placeholder: "Enter your email",
                value: n,
                onFocus: function () {
                  return p(!1);
                },
                onChange: function (e) {
                  return r(e.target.value);
                },
              }),
              Object(f.jsx)("input", {
                type: "password",
                placeholder: "Enter your password",
                value: s,
                onFocus: function () {
                  return p(!1);
                },
                onChange: function (e) {
                  return o(e.target.value);
                },
              }),
              Object(f.jsx)("button", { type: "submit", children: "Log In" }),
              x &&
                Object(f.jsx)("p", {
                  children: "Invalid credentials. Could not log in...",
                }),
            ],
          }),
        });
      }
      function v() {
        var e = Object(l.useState)(""),
          t = Object(i.a)(e, 2),
          n = t[0],
          r = t[1],
          c = Object(l.useState)(""),
          a = Object(i.a)(c, 2),
          s = a[0],
          o = a[1],
          u = Object(l.useState)(""),
          b = Object(i.a)(u, 2),
          x = b[0],
          p = b[1],
          h = d.a.useContext(j);
        return Object(f.jsx)("div", {
          className: "signin-login-container",
          children: Object(f.jsxs)("form", {
            onSubmit: function (e) {
              e.preventDefault(),
                Object(m.a)(g, n, s)
                  .then(function (e) {
                    Object(m.f)(g.currentUser, { displayName: x }),
                      h.setUser(e.user.displayName);
                  })
                  .catch(function (e) {
                    return console.log(e);
                  });
            },
            children: [
              Object(f.jsx)("h2", { children: "Create Account" }),
              Object(f.jsx)("input", {
                type: "name",
                placeholder: "Enter your name",
                value: x,
                required: !0,
                onChange: function (e) {
                  return p(e.target.value);
                },
              }),
              Object(f.jsx)("input", {
                type: "email",
                placeholder: "Enter your email",
                value: n,
                required: !0,
                onChange: function (e) {
                  return r(e.target.value);
                },
              }),
              Object(f.jsx)("input", {
                type: "password",
                placeholder: "Enter new password",
                value: s,
                required: !0,
                onChange: function (e) {
                  return o(e.target.value);
                },
              }),
              Object(f.jsx)("button", { type: "submit", children: "Sign Up" }),
            ],
          }),
        });
      }
      function N() {
        var e = d.a.useContext(j);
        return Object(f.jsx)("div", {
          className: "signin-login-container",
          children: Object(f.jsx)("h2", {
            className: "guest-login",
            onClick: function (t) {
              t.preventDefault(),
                Object(m.d)(g, "guest@no-email.com", "no-password")
                  .then(function (t) {
                    e.setUser("guest");
                  })
                  .catch(function (e) {
                    return console.log(e);
                  });
            },
            children: "Log In as a Guest",
          }),
        });
      }
      function y() {
        return Object(f.jsxs)("section", {
          className: "auth",
          children: [
            Object(f.jsx)(v, {}),
            Object(f.jsx)(O, {}),
            Object(f.jsx)(N, {}),
          ],
        });
      }
      function w() {
        var e = d.a.useContext(j),
          t = function () {
            Object(m.e)(g)
              .then(function () {
                fetch(
                  "https://precision-gym-default-rtdb.firebaseio.com/users/guest.json",
                  { method: "DELETE" }
                ),
                  console.log("Sign Out Successful \ud83d\udd12");
              })
              .catch(function (e) {
                return console.log(e);
              });
          };
        return (
          Object(l.useEffect)(function () {
            window.addEventListener("beforeunload", function () {
              g.currentUser && "guest" === g.currentUser.displayName && t();
            }),
              Object(m.c)(g, function (t) {
                t
                  ? e.setUser(
                      t.displayName ? t.displayName : t.email.split("@")[0]
                    )
                  : e.setUser(null);
              });
          }, []),
          Object(f.jsx)("div", {
            className: "auth-details",
            children:
              e.authUser &&
              Object(f.jsxs)(f.Fragment, {
                children: [
                  Object(f.jsx)("p", {
                    children: "Signed in as ".concat(e.authUser),
                  }),
                  Object(f.jsx)("button", { onClick: t, children: "Sign Out" }),
                ],
              }),
          })
        );
      }
      n(39), n(40), n(41), n(42);
      function k(e) {
        for (var t = Object(l.useContext)(j), n = [], r = 5; r > 0; r--)
          n.push(
            Object(f.jsx)(
              "span",
              {
                onClick: e.onRepClick,
                "data-value": 20 * r,
                className: "circle",
                style: { backgroundColor: e.rep >= 20 * r && "green" },
              },
              r
            )
          );
        var c = function (n) {
          var r = e.ex,
            c = r.sets[e.setIndex].reps;
          "delete" === n && (c.splice(e.repIndex, 1), console.log(r)),
            "add" === n && c.splice(e.repIndex + 1, 0, 0),
            t.updateDatabase(e.routineName, r, e.routineDate);
        };
        return Object(f.jsxs)("div", {
          className: "rep-expanded",
          "data-rep-num": e.repIndex,
          children: [
            Object(f.jsx)("span", {
              children: "Rep ".concat(e.repIndex + 1, ":"),
            }),
            Object(f.jsx)("div", {
              className: "gauge",
              children: n.map(function (e) {
                return e;
              }),
            }),
            Object(f.jsx)("button", {
              className: "add-delete-rep btn-transparent",
              onClick: c.bind(null, "delete"),
              children: "\u2796",
            }),
            Object(f.jsx)("button", {
              className: "add-delete-rep btn-transparent",
              onClick: c.bind(null, "add"),
              children: "\u2795",
            }),
          ],
        });
      }
      var C = n.p + "static/media/angle-bracket.80420581.png";
      n(43);
      function E(e) {
        var t = Object(l.useContext)(j),
          n = Object(l.useState)(!1),
          r = Object(i.a)(n, 2),
          c = r[0],
          a = r[1],
          s = function (n, r) {
            var c = Object.assign({}, e.ex);
            if (("delete" === n && c.sets.splice(r, 1), "add" === n)) {
              var a = Object.assign({}, c.sets[r]);
              (a.reps = Array(a.reps.length).fill(0)),
                c.sets.splice(r + 1, 0, a);
            }
            t.updateDatabase(e.routineName, c, e.routineDate);
          },
          o = function (e) {
            return 100 === e
              ? "#008000"
              : 80 === e
              ? "#008000bb"
              : 60 === e
              ? "#00800090"
              : 40 === e
              ? "#0080006c"
              : 20 === e
              ? "#0080002c"
              : "white";
          };
        return Object(f.jsxs)(
          "div",
          {
            className: "exercise-stats",
            "data-set-num": e.setIndex,
            children: [
              Object(f.jsxs)("div", {
                className: "exercise-stats--row",
                children: [
                  Object(f.jsxs)("span", {
                    className: "exercise-stats--set-num",
                    children: ["Set ", e.setIndex + 1],
                  }),
                  Object(f.jsx)("div", {
                    className: "exercise-stats--set-gauge",
                    children: e.ex.sets[e.setIndex].reps.map(function (e, t) {
                      return Object(f.jsx)(
                        "div",
                        {
                          className: "gauge-sector",
                          style: { backgroundColor: o(e) },
                        },
                        t
                      );
                    }),
                  }),
                ],
              }),
              Object(f.jsxs)("div", {
                className: "exercise-stats--row",
                children: [
                  Object(f.jsxs)("div", {
                    className: "exercise-stats--weight",
                    children: [
                      Object(f.jsx)("label", {
                        htmlFor: "weight",
                        children: "weight (kg): ",
                      }),
                      Object(f.jsx)("input", {
                        name: "weight",
                        type: "number",
                        step: "0.5",
                        defaultValue: e.ex.sets[e.setIndex].weight,
                        onBlur: function (n) {
                          return (function (n, r) {
                            (e.ex.sets[r].weight = +n.target.value),
                              t.updateDatabase(
                                e.routineName,
                                e.ex,
                                e.routineDate
                              );
                          })(n, e.setIndex);
                        },
                        onChange: function (e) {
                          return e.target.value;
                        },
                        onKeyDown: e.onKeyDown,
                      }),
                    ],
                  }),
                  Object(f.jsx)("button", {
                    className: "expand-stats-btn btn-transparent ",
                    onClick: function () {
                      a(function (e) {
                        return !e;
                      });
                    },
                    children: Object(f.jsx)("img", {
                      src: C,
                      style: {
                        transform: c ? "rotate(-90deg)" : "rotate(-180deg)",
                      },
                      alt: "toggle reps button",
                    }),
                  }),
                  Object(f.jsx)("button", {
                    className: "delete-set",
                    onClick: s.bind(null, "delete", e.setIndex),
                    children: "\u274c",
                  }),
                ],
              }),
              Object(f.jsx)("div", {
                className: "exercise-stats--reps",
                style: {
                  height: c
                    ? "".concat(20 * e.ex.sets[e.setIndex].reps.length, "px")
                    : 0,
                  opacity: c ? 1 : 0,
                },
                children: e.ex.sets[e.setIndex].reps.map(function (n, r) {
                  return Object(f.jsx)(
                    k,
                    {
                      rep: n,
                      repIndex: r,
                      setIndex: e.setIndex,
                      ex: e.ex,
                      routineName: e.routineName,
                      routineDate: e.routineDate,
                      onRepClick: function (n) {
                        return (function (n, r, c) {
                          var a = +n.target.dataset.value,
                            s = e.ex;
                          (s.sets[r].reps[c] = a),
                            t.updateDatabase(e.routineName, s, e.routineDate);
                        })(n, e.setIndex, r);
                      },
                    },
                    r
                  );
                }),
              }),
              Object(f.jsx)("button", {
                className: "add-set",
                onClick: s.bind(null, "add", e.setIndex),
                children: "+ Add a set",
              }),
            ],
          },
          e.setIndex + 1
        );
      }
      function I(e) {
        var t = d.a.useContext(j),
          n = function (e) {
            "Enter" === e.key && e.target.blur();
          };
        return Object(f.jsxs)("div", {
          className: "exercise ".concat(e.ex.name),
          "data-ex-index": e.exIndex,
          children: [
            Object(f.jsx)("div", {
              className: "delete-exercise",
              onClick: function () {
                t.deleteExercise(e.routineName, e.ex.name, e.routineDate);
              },
              children: "\u274c",
            }),
            Object(f.jsxs)("div", {
              className: "exercise-stat exercise-stats--name",
              children: [
                Object(f.jsx)("label", {
                  htmlFor: "name",
                  children: "Exercise Name: ",
                }),
                Object(f.jsx)("input", {
                  name: "name",
                  type: "text",
                  defaultValue: e.ex.name,
                  onChange: function (e) {
                    return e.target.value;
                  },
                  onKeyDown: n,
                  onBlur: function (n) {
                    return (function (n) {
                      (e.ex.name = n.target.value),
                        t.updateDatabase(e.routineName, e.ex, e.routineDate);
                    })(n);
                  },
                  style: { width: "".concat(e.ex.name.length, "ch") },
                }),
              ],
            }),
            e.ex.sets.map(function (t, r) {
              return Object(f.jsx)(
                E,
                {
                  setIndex: r,
                  ex: e.ex,
                  onKeyDown: n,
                  routineName: e.routineName,
                  routineDate: e.routineDate,
                },
                r
              );
            }),
          ],
        });
      }
      var D = n.p + "static/media/icon-slide-change.354b15d9.svg";
      function S(e) {
        var t = new Date(),
          n = t.getDate() < 10 ? "0".concat(t.getDate()) : t.getDate(),
          r =
            t.getMonth() < 10
              ? "0".concat(t.getMonth() + 1)
              : "".concat(t.getMonth() + 1),
          c = "".concat(t.getFullYear(), "-").concat(r, "-").concat(n),
          a = Object.keys(e.routine.logbook),
          s = Object(l.useState)(0),
          o = Object(i.a)(s, 2),
          u = o[0],
          d = o[1],
          b = Object(l.useState)(!1),
          x = Object(i.a)(b, 2),
          m = x[0],
          p = x[1],
          h = Object(l.useState)(a[a.length - 1]),
          g = Object(i.a)(h, 2),
          O = g[0],
          v = g[1],
          N = a.some(function (e) {
            return e === c;
          }),
          y = Object(l.useContext)(j),
          w = function (e, t) {
            "prev" === t &&
              d(function (e) {
                return e - 1;
              }),
              "next" === t &&
                d(function (e) {
                  return e + 1;
                });
          };
        return (
          Object(l.useEffect)(function () {
            O === c && p(!0), O !== c && p(!1);
          }, []),
          Object(l.useEffect)(
            function () {
              a.some(function (e) {
                return e === c;
              }) && (p(!0), v(a[a.length - 1]));
            },
            [a.length]
          ),
          Object(f.jsxs)("section", {
            className: e.className,
            id: e.id,
            "data-routine-name": e.routineName,
            "data-date": O,
            children: [
              Object(f.jsx)("button", {
                className: "slide-btn slide-left",
                style: { visibility: 0 === u && "hidden" },
                onClick: function (e) {
                  return w(0, "prev");
                },
                children: Object(f.jsx)("img", {
                  src: D,
                  alt: "slide-left arrow",
                }),
              }),
              Object(f.jsx)("button", {
                className: "slide-btn slide-right",
                style: {
                  visibility:
                    O && u === e.routine.logbook[O].length - 1 && "hidden",
                },
                onClick: function (e) {
                  return w(0, "next");
                },
                children: Object(f.jsx)("img", {
                  src: D,
                  alt: "slide-right arrow",
                }),
              }),
              Object(f.jsx)("h2", { children: e.routineName }),
              Object(f.jsxs)("select", {
                name: "routine-dates",
                value: O,
                readOnly: O,
                children: [
                  Object(f.jsx)("option", { children: "Select a date" }),
                  a
                    .map(function (e, t) {
                      return Object(f.jsx)(
                        "option",
                        {
                          onClick: function () {
                            return (function (e, t) {
                              v(e);
                            })(e);
                          },
                          value: e,
                          children: e,
                        },
                        e
                      );
                    })
                    .sort(function (e, t) {
                      return e - t;
                    }),
                ],
              }),
              !N &&
                Object(f.jsx)("button", {
                  onClick: function () {
                    y.addNewDate(e.routineName, c), p(!0), d(0);
                  },
                  children: "+ I'm doing a new session today!",
                }),
              e.routine.logbook[O] &&
                Object(f.jsx)("div", {
                  "data-date": O,
                  className: "exercises-container",
                  style: {
                    transform: "translateX(-".concat(300 * u, "px)"),
                    width: "".concat(300 * e.routine.logbook[O].length, "px"),
                  },
                  children: e.routine.logbook[O].map(function (t, n) {
                    return Object(f.jsx)(
                      I,
                      {
                        routineName: e.routineName,
                        routineIndex: e.routineIndex,
                        routineDate: O,
                        ex: t,
                        onEditExercise: function () {
                          y.toggleModal(t);
                        },
                        onBlur: function (n) {
                          return (function (t, n) {
                            var r = n,
                              c = Object.keys(r).find(function (e) {
                                return r[e] === r[t.target.name];
                              });
                            (r[c] = t.target.value),
                              y.updateDatabase(e.routineName, r, O);
                          })(n, t);
                        },
                        onDeleteExercise: y.deleteExercise,
                      },
                      "".concat(t.name, "-").concat(n + 1)
                    );
                  }),
                }),
              m &&
                Object(f.jsx)("button", {
                  className: "add-ex-btn",
                  onClick: function () {
                    y.toggleModal({
                      routineName: e.routineName,
                      routineDate: O,
                      exercises: e.routine.logbook[O],
                    });
                  },
                  children: "+ Add Exercise",
                }),
            ],
          })
        );
      }
      n(44);
      function L() {
        var e = d.a.useContext(j),
          t = Object(l.useRef)(),
          n = Object(l.useRef)(),
          r = Object(l.useRef)(),
          a = Object(l.useRef)(),
          s = Object(l.useRef)(null);
        return (
          Object(l.useEffect)(function () {
            var t = function (t) {
              s.current && !s.current.contains(t.target) && e.toggleModal();
            };
            return (
              window.addEventListener("click", t),
              function () {
                window.removeEventListener("click", t);
              }
            );
          }, []),
          Object(f.jsx)(f.Fragment, {
            children: c.a.createPortal(
              Object(f.jsxs)("div", {
                className: "exercise-form",
                ref: s,
                children: [
                  Object(f.jsx)("div", {
                    className: "close",
                    onClick: e.toggleModal,
                    children: "\u274c",
                  }),
                  Object(f.jsxs)("form", {
                    onSubmit: function (c) {
                      c.preventDefault();
                      var s = t.current.value,
                        i = n.current.value,
                        o = r.current.value,
                        u = a.current.value,
                        l = {
                          id: e.currentRoutine.exercises.length + 1,
                          name: s,
                          sets: Array(+o).fill({
                            weight: i,
                            reps: Array(+u).fill(0),
                          }),
                        };
                      e.updateDatabase(
                        e.currentRoutine.routineName,
                        l,
                        e.currentRoutine.routineDate
                      ),
                        e.toggleModal();
                    },
                    children: [
                      Object(f.jsx)("label", {
                        htmlFor: "name",
                        children: "Exercise Name",
                      }),
                      Object(f.jsx)("input", {
                        name: "name",
                        type: "text",
                        ref: t,
                        defaultValue: "",
                        required: !0,
                      }),
                      Object(f.jsx)("label", {
                        htmlFor: "weight",
                        children: "Weight (kg)",
                      }),
                      Object(f.jsx)("input", {
                        name: "weight",
                        type: "number",
                        step: "any",
                        min: "0",
                        ref: n,
                        defaultValue: "",
                        required: !0,
                      }),
                      Object(f.jsx)("label", {
                        htmlFor: "sets",
                        children: "Sets",
                      }),
                      Object(f.jsx)("input", {
                        name: "sets",
                        type: "number",
                        ref: r,
                        min: "0",
                        defaultValue: "",
                        required: !0,
                      }),
                      Object(f.jsx)("label", {
                        htmlFor: "reps",
                        children: "Reps per set",
                      }),
                      Object(f.jsx)("input", {
                        name: "reps",
                        type: "number",
                        min: "0",
                        ref: a,
                        defaultValue: "",
                        required: !0,
                      }),
                      Object(f.jsx)("button", {
                        className: "button",
                        type: "submit",
                        children: "\ud83d\udc4a Add Exercise",
                      }),
                    ],
                  }),
                ],
              }),
              document.getElementById(
                e.currentRoutine.routineName.toLowerCase().split(" ").join("-")
              )
            ),
          })
        );
      }
      var U = n(1);
      n(45);
      function R(e) {
        var t = d.a.useContext(j),
          n = Object(l.useState)(!1),
          r = Object(i.a)(n, 2),
          c = r[0],
          a = r[1],
          s = Object(l.useRef)();
        return Object(f.jsxs)("div", {
          className: "add-new-routine-container",
          children: [
            !c &&
              Object(f.jsx)("button", {
                onClick: function () {
                  a(!0);
                },
                children: "+ Add a new routine",
              }),
            c &&
              Object(f.jsxs)("form", {
                onSubmit: function (n) {
                  n.preventDefault();
                  var r = {
                    routineName: s.current.value.toString(),
                    routineId: null,
                    logbook: Object(U.a)({}, A(), [
                      {
                        id: 1,
                        name: "Enter a new exercise name",
                        sets: [{ weight: 0, reps: [Array(5).fill(0)] }],
                      },
                    ]),
                  };
                  t.addNewRoutine(e.routineIndex, r), a(!1);
                },
                className: "new-routine-form",
                children: [
                  Object(f.jsx)("input", {
                    placeholder: "Enter session name",
                    ref: s,
                  }),
                  Object(f.jsx)("button", {
                    type: "submit",
                    className: "btn-transparent",
                    children: "\u2795",
                  }),
                ],
              }),
          ],
        });
      }
      function F() {
        var e = d.a.useContext(j);
        return (
          d.a.useEffect(
            function () {
              e.fetchExerciseDatabase();
            },
            [e.fetchExerciseDatabase]
          ),
          Object(f.jsxs)("div", {
            className: "user-dashboard",
            children: [
              e.routineList
                .sort(function (e, t) {
                  return e.routineId - t.routineId;
                })
                .map(function (e, t) {
                  var n = e.routineName.toLowerCase().split(" ").join("-");
                  return Object(f.jsxs)(
                    "div",
                    {
                      className: "routine-container",
                      children: [
                        Object(f.jsx)(
                          S,
                          {
                            className: "routine ".concat(n),
                            id: n,
                            routineName: e.routineName,
                            routine: e,
                          },
                          t
                        ),
                        Object(f.jsx)(R, { routineIndex: t }),
                      ],
                    },
                    "rc".concat(t)
                  );
                }),
              e.modalWindowIsOpen && Object(f.jsx)(L, {}),
            ],
          })
        );
      }
      var M = function () {
          var e = d.a.useContext(j);
          return Object(f.jsxs)("div", {
            className: "app",
            children: [
              Object(f.jsx)(x, {}),
              Object(f.jsx)(w, {}),
              !e.authUser && Object(f.jsx)(y, {}),
              e.authUser && Object(f.jsx)(F, {}),
              e.authUser && e.routineList.length <= 0 && Object(f.jsx)(R, {}),
            ],
          });
        },
        A = function () {
          var e = new Date(),
            t = e.getDate() < 10 ? "0".concat(e.getDate()) : e.getDate(),
            n =
              e.getMonth() < 10
                ? "0".concat(e.getMonth() + 1)
                : "".concat(e.getMonth() + 1);
          return "".concat(e.getFullYear(), "-").concat(n, "-").concat(t);
        };
      function T(e) {
        var t = d.a.useState(null),
          n = Object(i.a)(t, 2),
          r = n[0],
          c = n[1],
          o = d.a.useState([]),
          b = Object(i.a)(o, 2),
          x = b[0],
          m = b[1],
          p = d.a.useState(!1),
          h = Object(i.a)(p, 2),
          g = h[0],
          O = h[1],
          v = d.a.useState({ name: "", date: "", exercises: [] }),
          N = Object(i.a)(v, 2),
          y = N[0],
          w = N[1],
          k = d.a.useCallback(
            Object(s.a)(
              u.a.mark(function e() {
                var t, n, c;
                return u.a.wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.prev = 0),
                            (e.next = 3),
                            fetch(
                              "https://precision-gym-default-rtdb.firebaseio.com/users/".concat(
                                r,
                                "/routines.json"
                              )
                            )
                          );
                        case 3:
                          if ((t = e.sent).ok) {
                            e.next = 6;
                            break;
                          }
                          throw new Error("Could not reach database...");
                        case 6:
                          return (e.next = 8), t.json();
                        case 8:
                          (n = e.sent),
                            (c = n ? Object.values(n) : []),
                            m(c),
                            (e.next = 16);
                          break;
                        case 13:
                          (e.prev = 13),
                            (e.t0 = e.catch(0)),
                            console.log("\ud83d\udca5 ".concat(e.t0));
                        case 16:
                        case "end":
                          return e.stop();
                      }
                  },
                  e,
                  null,
                  [[0, 13]]
                );
              })
            ),
            [r]
          ),
          C = (function () {
            var e = Object(s.a)(
              u.a.mark(function e(t, n, c) {
                var a, s, i;
                return u.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          console.log(t, n, c),
                          (a = D.routineList.slice()),
                          (s = D.routineList.findIndex(function (e) {
                            return e.routineName === t;
                          })),
                          n &&
                            ((a[s].logbook[c][n.id - 1] = n),
                            a[s].logbook[c].forEach(function (e, t) {
                              return (e.id = t + 1);
                            })),
                          m(a),
                          (i = a.find(function (e) {
                            return e.routineName === t;
                          })),
                          (e.next = 8),
                          fetch(
                            "https://precision-gym-default-rtdb.firebaseio.com/users/"
                              .concat(r, "/routines/")
                              .concat(t, "/.json"),
                            {
                              method: "PUT",
                              body: JSON.stringify(i),
                              headers: { "Content-Type": "application-json" },
                            }
                          )
                        );
                      case 8:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, r) {
              return e.apply(this, arguments);
            };
          })(),
          E = (function () {
            var e = Object(s.a)(
              u.a.mark(function e(t, n, c) {
                var a, s, i, o;
                return u.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (a = x
                            .find(function (e) {
                              return e.routineName === t;
                            })
                            .logbook[c].filter(function (e) {
                              return e.name !== n;
                            })),
                          (s = x.findIndex(function (e) {
                            return e.routineName === t;
                          })),
                          ((i = x.slice())[s].logbook[c] = a),
                          i[s].logbook[c].forEach(function (e, t) {
                            return (e.id = t + 1);
                          }),
                          m(i),
                          (o = i.find(function (e) {
                            return e.routineName === t;
                          })),
                          (e.next = 9),
                          fetch(
                            "https://precision-gym-default-rtdb.firebaseio.com/users/"
                              .concat(r, "/routines/")
                              .concat(t, "/.json"),
                            {
                              method: "PUT",
                              body: JSON.stringify(o),
                              headers: { "Content-Type": "application-json" },
                            }
                          )
                        );
                      case 9:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n, r) {
              return e.apply(this, arguments);
            };
          })(),
          I = (function () {
            var e = Object(s.a)(
              u.a.mark(function e(t, n) {
                var c, a, s, i, o;
                return u.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (c = x.find(function (e) {
                            return e.routineName == t;
                          })),
                          (a = Object.values(c.logbook)),
                          (s = a[a.length - 1]),
                          (i = s.map(function (e) {
                            for (
                              var t = { id: e.id, name: e.name, sets: e.sets },
                                n = [],
                                r = function (t) {
                                  n.push({
                                    weight: e.sets[t].weight,
                                    reps: Array(5)
                                      .fill(0)
                                      .map(function (n) {
                                        return n * e.sets[t].reps.length;
                                      }),
                                  });
                                },
                                c = 0;
                              c < e.sets.length;
                              c++
                            )
                              r(c);
                            return (t.sets = n), t;
                          })),
                          (c.logbook[n] = i),
                          (o = x.filter(function (e) {
                            return e.routineName !== t;
                          })).push(c),
                          m(o),
                          (e.next = 10),
                          fetch(
                            "https://precision-gym-default-rtdb.firebaseio.com/users/"
                              .concat(r, "/routines/")
                              .concat(t, "/logbook/")
                              .concat(n, ".json"),
                            {
                              method: "PUT",
                              body: JSON.stringify(i),
                              headers: { "Content-Type": "application-json" },
                            }
                          )
                        );
                      case 10:
                      case "end":
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t, n) {
              return e.apply(this, arguments);
            };
          })(),
          D = {
            authUser: r,
            setUser: function (e) {
              return c(e);
            },
            routineList: x,
            modalWindowIsOpen: g,
            deleteExercise: E,
            toggleModal: function (e) {
              console.log(e), O(!g), w(e);
            },
            currentRoutine: y,
            updateDatabase: C,
            fetchExerciseDatabase: k,
            addNewDate: I,
            addNewRoutine: function (e, t) {
              var n = Object(a.a)(x);
              n.splice(e + 1, 0, t),
                n.forEach(function (e, t) {
                  return (e.routineId = t + 1);
                }),
                m(n),
                n.forEach(function (e, t) {
                  return fetch(
                    "https://precision-gym-default-rtdb.firebaseio.com/users/"
                      .concat(r, "/routines/")
                      .concat(e.routineName, ".json"),
                    {
                      method: "PUT",
                      body: JSON.stringify(e),
                      headers: { "Content-Type": "application-json" },
                    }
                  );
                });
            },
          };
        return (
          Object(l.useEffect)(
            function () {
              console.log("Stored Routine List:", x);
            },
            [x, y]
          ),
          Object(f.jsx)(j.Provider, {
            value: D,
            children: Object(f.jsx)(M, { children: e.children }),
          })
        );
      }
      c.a.render(Object(f.jsx)(T, {}), document.getElementById("root"));
    },
  },
  [[46, 1, 2]],
]);
//# sourceMappingURL=main.b12fd92a.chunk.js.map
