function ketoDietBuddy() {
    "use strict";
  
    function t(t) {
      return t
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  
    function e(e, i, s) {
      var n =
        '<tr><td class="kdbAttributeName">$name$</td><td class="kdbAttributeValue">$value$</td><td class="kdbAttributeUnits">$units$</td></tr>';
      return n
        .replace("$name$", t(e))
        .replace("$value$", t(i))
        .replace("$units$", t(s));
    }
    (this.init = function (t) {
      function e(t, e, i) {
        return Math.min(Math.max(e, t), i);
      }
      switch (
        ((this.gender = t.gender),
        (this.age = e(t.age, 0, 150)),
        (this.weight = e(t.weight, 0, 350)),
        (this.height = e(t.height, 0, 250)),
        (this.activityLevel = e(t.activityLevel, 0, 1)),
        (this.bodyfat = e(t.bodyfat, 0, 100)),
        (this.netCarbs = e(t.netCarbs, 0, 1e3)),
        this.gender)
      ) {
        default:
        case GenderEnum.FEMALE:
          this.bmr =
            9.99 * this.weight + 6.25 * this.height - 4.92 * this.age - 161;
          break;
        case GenderEnum.MALE:
          this.bmr =
            9.99 * this.weight + 6.25 * this.height - 4.92 * this.age + 5;
      }
      var i = 1.3,
        s = 2.2,
        n = i + (s - i) * this.activityLevel,
        a = ((100 - this.bodyfat) * this.weight) / 100;
      this.longTermProteinIntake = a * n;
      var o = [1.1, 1.2, 1.4, 1.6, 2],
        h = parseInt(Math.round(4 * this.activityLevel).toFixed(0)),
        r = o[h];
      switch (
        ((this.maintenanceCalorieIntake = this.bmr * r * 1.1), this.gender)
      ) {
        default:
        case GenderEnum.FEMALE:
          this.essentialBodyFat = 8;
          break;
        case GenderEnum.MALE:
          this.essentialBodyFat = 3;
      }
      return (
        (this.nonEssentialBodyFat = this.bodyfat - this.essentialBodyFat),
        this.nonEssentialBodyFat < 0
          ? ((this.nonEssentialBodyFat = 0), (this.bodyFatTooLow = !0))
          : (this.bodyFatTooLow = !1),
        this
      );
    }),
      (this.calculateFatIntakeInGrams = function (t, e, i) {
        var s = 4 * e,
          n = 4 * i,
          a = t - (s + n),
          o = a / 9;
        return o;
      }),
      (this.calculateCalorieIntakeFromMacronutrients = function (t, e, i) {
        return 9 * t + 4 * e + 4 * i;
      }),
      (this.calculateMacronutrientRatio = function (t, e, i) {
        function s(t) {
          return parseFloat(t.toFixed(1));
        }
  
        function n(t) {
          return parseFloat(t.toFixed(0));
        }
  
        function a(t) {
          return parseFloat(t.toFixed(0));
        }
        var o = 9 * t,
          h = 4 * e,
          r = 4 * i,
          l = r + h + o;
        if (!(0 >= l)) {
          (t = s(t)), (e = s(e)), (i = s(i));
          var c = {};
          return (
            (c.energy = l),
            (c.gramsFat = t),
            (c.gramsProtein = e),
            (c.gramsNetCarbs = i),
            (c.energyFat = a(o)),
            (c.energyProtein = a(h)),
            (c.energyNetCarbs = a(r)),
            (c.percEnergyNetCarbs = n((100 * r) / l)),
            (c.percEnergyProtein = n((100 * h) / l)),
            (c.percEnergyFat = n(
              100 - (c.percEnergyNetCarbs + c.percEnergyProtein)
            )),
            c
          );
        }
      }),
      (this.calculateCalorieIntake = function (t) {
        var e = {};
        (e.adjustment = t),
          (e.warnings = 0),
          this.bodyFatTooLow
            ? (e.warnings |= WarningsEnum.BODYFATTOOLOW)
            : n >= this.maintenanceCalorieIntake &&
              (e.warnings |= WarningsEnum.CARBSTOOHIGH);
        var i = ((this.bodyfat - this.essentialBodyFat) * this.weight) / 100,
          s = this.calculateFatIntakeInGrams(
            this.maintenanceCalorieIntake,
            this.longTermProteinIntake,
            this.netCarbs
          );
        0 > s && ((s = 0), (e.warnings |= WarningsEnum.CARBSTOOHIGH));
        var n = this.maintenanceCalorieIntake - 69.2 * Math.max(0, i),
          a = this.calculateFatIntakeInGrams(
            n,
            this.longTermProteinIntake,
            this.netCarbs
          );
        30 > a &&
          ((a = 30),
          (n = this.calculateCalorieIntakeFromMacronutrients(
            a,
            this.longTermProteinIntake,
            this.netCarbs
          )));
        var o =
            this.maintenanceCalorieIntake +
            (t * this.maintenanceCalorieIntake) / 100,
          h = this.calculateFatIntakeInGrams(
            o,
            this.longTermProteinIntake,
            this.netCarbs
          );
        return (
          0 > h && ((h = 0), (e.warnings |= WarningsEnum.CARBSTOOHIGH)),
          (e.maintenance = this.calculateMacronutrientRatio(
            s,
            this.longTermProteinIntake,
            this.netCarbs
          )),
          (e.minimum = this.calculateMacronutrientRatio(
            a,
            this.longTermProteinIntake,
            this.netCarbs
          )),
          (e.desirable = this.calculateMacronutrientRatio(
            h,
            this.longTermProteinIntake,
            this.netCarbs
          )),
          e.desirable.gramsFat < 30 &&
            (e.warnings |= WarningsEnum.FATGRAMSTOOLOW),
          1200 > o && (e.warnings |= WarningsEnum.CALORIESTOOLOW),
          console.log(e),
          e
        );
      }),
      (this.renderOverview = function (t) {
        function i(t) {
          var i = "<table>";
          return (
            (i += e("Your Basal Metabolic Rate is:", t.bmr.toFixed(0), "kcal")),
            (i += e("Your net carbs intake is:", t.netCarbs.toFixed(0), "grams")),
            (i += e(
              "Your ideal protein intake is:",
              t.longTermProteinIntake.toFixed(0),
              "grams"
            )),
            (i += "</table>")
          );
        }
        for (; t.firstChild; ) t.removeChild(t.firstChild);
        var s = document.createElement("div");
        s.setAttribute("class", "kdbMacroSummary"),
          t.appendChild(s),
          (s.innerHTML = i(this));
      }),
      (this.renderResults = function (i, s, n) {
        function a(t) {
          var s = "<table>";
          return (
            0 === i.adjustment &&
              (s += e("Your BMR is:", t.bmr.toFixed(0), "kcal")),
            (s += e(
              "Calories to consume:",
              i.desirable.energy.toFixed(0),
              "kcal"
            )),
            (s += e(
              "Your fat intake should be:",
              i.desirable.gramsFat.toFixed(0),
              "grams"
            )),
            (s += "</table>")
          );
        }
  
        function o(e, i, s, n) {
          return e.replace(/\$class\$/g, n).replace(i, t(s));
        }
  
        function h() {
          for (
            var t = ["kdbNetCarbs", "kdbProtein", "kdbFat"],
              e = '<td colspan="2" class="kdbLegendName $class$">$name$</td>',
              i =
                '<td class="kdbLegendValue $class$">$value$</td><td class="kdbLegendUnits $class$">%</td>',
              s =
                '<td class="kdbLegendValue $class$">$value$</td><td class="kdbLegendUnits $class$">kcal</td>',
              n =
                '<td class="kdbLegendValue $class$">$value$</td><td class="kdbLegendUnits $class$">grams</td>',
              a = "<table><tr>",
              h = 0;
            3 > h;
            ++h
          )
            a += o(e, "$name$", v[h].label, t[h]);
          a += "</tr><tr>";
          for (var h = 0; 3 > h; ++h)
            a += o(n, "$value$", v[h].valueGrams.toFixed(0), t[h]);
          a += "</tr><tr>";
          for (var h = 0; 3 > h; ++h)
            a += o(s, "$value$", v[h].valueEnergy.toFixed(0), t[h]);
          a += "</tr><tr>";
          for (var h = 0; 3 > h; ++h)
            a += o(i, "$value$", v[h].value.toFixed(0), t[h]);
          return (a += "</tr></table>");
        }
        for (; s.firstChild; ) s.removeChild(s.firstChild);
        var r = document.createElement("div");
        if ((r.setAttribute("class", "kdbMacroOverview"), s.appendChild(r), n)) {
          var l = document.createElement("h4");
          l.setAttribute("class", "kdbMacroChartTitle"),
            (l.innerHTML = t(n)),
            r.appendChild(l);
        }
        if (
          (i.warnings & WarningsEnum.FATGRAMSTOOLOW) ==
          WarningsEnum.FATGRAMSTOOLOW
        ) {
          var c = document.createElement("p");
          c.setAttribute("class", "kdbWarning"),
            (c.innerHTML = t(
              "Your fat intake is too low. Please, select a smaller calorie deficit."
            )),
            r.appendChild(c);
        }
        if (
          (i.warnings & WarningsEnum.CALORIESTOOLOW) ==
          WarningsEnum.CALORIESTOOLOW
        ) {
          var c = document.createElement("p");
          c.setAttribute("class", "kdbWarning"),
            (c.innerHTML = t(
              "Your calorie intake is too low. Please, select a smaller calorie deficit to minimise the risk of micronutrient deficiencies. You should be aiming for no more than 1-2 pounds of fat loss per week."
            )),
            r.appendChild(c);
        }
        var u = document.createElement("div");
        u.setAttribute("class", "kdbMacroContent"), r.appendChild(u);
        var d = document.createElement("div");
        d.setAttribute("class", "kdbMacroContentLeft"), u.appendChild(d);
        var p = document.createElement("div");
        p.setAttribute("class", "kdbMacroContentRight"), u.appendChild(p);
        var g = document.createElement("canvas");
        g.setAttribute("class", "kdbMacroChart"),
          g.setAttribute("width", "120px"),
          g.setAttribute("height", "120px"),
          p.appendChild(g);
        var f = document.createElement("div");
        f.setAttribute("class", "kdbEnergyOverview"),
          (f.innerHTML = a(this)),
          d.appendChild(f);
        var m = document.createElement("div");
        m.setAttribute("class", "kdbMacroLegend"), d.appendChild(m);
        var v = [
          {
            value: i.desirable.percEnergyNetCarbs,
            valueGrams: i.desirable.gramsNetCarbs,
            valueEnergy: i.desirable.energyNetCarbs,
            color: "rgba(186,57,31,.6)",
            highlight: "rgba(186,57,31,.6)",
            label: "Net Carbs",
          },
          {
            value: i.desirable.percEnergyProtein,
            valueGrams: i.desirable.gramsProtein,
            valueEnergy: i.desirable.energyProtein,
            color: "rgba(239,180,49,.6)",
            highlight: "rgba(239,180,49,.6)",
            label: "Protein",
          },
          {
            value: i.desirable.percEnergyFat,
            valueGrams: i.desirable.gramsFat,
            valueEnergy: i.desirable.energyFat,
            color: "rgba(223,103,31,.6)",
            highlight: "rgba(223,103,31,.6)",
            label: "Fat",
          },
        ];
        //     y = new Chart(g.getContext("2d"));
        // Chart.types.Pie.extend({
        //     name: "PieWithLabels",
        //     draw: function() {
        //         Chart.types.Pie.prototype.draw.apply(this, arguments), this.chart.ctx.fillStyle = "black", this.chart.ctx.textAlign = "center", this.chart.ctx.textBaseline = "middle", this.chart.ctx.fillStyle = "#000", this.chart.ctx.font = "normal 10px Helvetica";
        //         for (var t = 0; t < this.segments.length; t++) {
        //             var e = this.segments[t].value.toFixed(0);
        //             if (e >= 5) {
        //                 var i = this.segments[t].startAngle + (this.segments[t].endAngle - this.segments[t].startAngle) / 2,
        //                     s = this.segments[t].outerRadius / 1.5,
        //                     n = this.segments[t].x + Math.cos(i) * s,
        //                     a = this.segments[t].y + Math.sin(i) * s;
        //                 this.chart.ctx.fillText(e + "%", n, a)
        //             }
        //         }
        //     }
        // }), y.PieWithLabels(v, {
        //     responsive: !1,
        //     maintainAspectRatio: !0,
        //     showTooltips: !1,
        //     segmentShowStroke: !0,
        //     segmentStrokeColor: "#fff",
        //     segmentStrokeWidth: 2,
        //     animationEasing: "easeOutLinear",
        //     animationSteps: 30,
        //     animateScale: !1,
        //     animateRotate: !0,
        //     onAnimationComplete: function() {}
        // }),
        m.innerHTML = h();
      });
  }
  
  function getCookieId(t) {
    var e = /\[.+=(.+)\]/i;
    return "ketoBuddy" + t.match(e)[1];
  }
  
  function setCookie(t, e, i) {
    var s = new Date();
    s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3);
    var n = "expires=" + s.toGMTString();
    document.cookie = t + "=" + e + "; " + n;
  }
  
  function getCookie(t) {
    for (
      var e = t + "=", i = document.cookie.split(";"), s = 0;
      s < i.length;
      s++
    ) {
      var n = i[s].trim();
      if (0 == n.indexOf(e)) return n.substring(e.length, n.length);
    }
    return "";
  }
  
  function tryGetText(t, e, i) {
    try {
      var s = jQuery(t).val();
      if (0 === s.length) throw "Missing value";
      var n = parseFloat(s);
      if (isNaN(n)) throw "Invalid value";
      if (void 0 !== e && e > n) throw "Invalid value";
      if (void 0 !== i && n > i) throw "Invalid value";
      return (
        setCookie(getCookieId(t), s, 30),
        jQuery(t).css("border", "1px solid #e3e3e3"),
        n
      );
    } catch (e) {
      return (
        jQuery("#badResults").show(),
        jQuery("#okResults").hide(),
        jQuery(t).css("border", "4px solid red"),
        0
      );
    }
  }
  
  function trySetCheckedFromCookie(t) {
    var e = getCookie(getCookieId(t));
    if (null != e && e.length > 0) {
      var i = /\[.+=(.+)\]/i,
        s = "#" + t.match(i)[1] + e;
      jQuery(s).prop("checked", !0);
    }
  }
  
  function trySetTextFromCookie(t) {
    var e = getCookie(getCookieId(t));
    null != e && e.length > 0 && jQuery(t).val(e);
  }
  
  function trySetText(t, e, i) {
    try {
      e != Math.floor(e) ? jQuery(t).val(e.toFixed(i)) : jQuery(t).val(e);
    } catch (t) {}
  }
  
  function getGender() {
    var t = jQuery("input[name=gender_switcher]");
    return (
      setCookie(
        getCookieId("input[name=gender_switcher]"),
        t.attr("checked"),
        30
      ),
      undefined === t.attr("checked") ? GenderEnum.FEMALE : GenderEnum.MALE
    );
  }
  
  function getAge() {
    return tryGetText("input[name=age]", 8, 150);
  }
  
  function getWeight() {
    if (0 == units) {
      var t = tryGetText("input[name=weightMetricKilos]", 20, 500),
        e = t / 0.4536;
      trySetText("input[name=weightUSPounds]", e, 1);
      var i = Math.floor(e / 14);
      return (
        (e -= 14 * i),
        trySetText("input[name=weightImperialStones]", i, 0),
        trySetText("input[name=weightImperialPounds]", e, 1),
        t
      );
    }
    if (1 == units) {
      var e = tryGetText("input[name=weightUSPounds]", 44, 1100),
        t = 0.4536 * e;
      trySetText("input[name=weightMetricKilos]", t, 1);
      var i = Math.floor(e / 14);
      return (
        (e -= 14 * i),
        trySetText("input[name=weightImperialStones]", i, 0),
        trySetText("input[name=weightImperialPounds]", e, 1),
        t
      );
    }
    var s = tryGetText("input[name=weightImperialStones]", 3, 78),
      e = tryGetText("input[name=weightImperialPounds]", 0, 14);
    e += 14 * s;
    var t = 0.4536 * e;
    return (
      trySetText("input[name=weightMetricKilos]", t, 1),
      trySetText("input[name=weightUSPounds]", e, 1),
      t
    );
  }
  
  function getHeight() {
    if (0 == units) {
      var t = tryGetText("input[name=heightMetricMeters]", 0.5, 3),
        e = 39.3701 * t,
        i = Math.floor(e / 12);
      return (
        (e -= 12 * i),
        trySetText("input[name=heightUSFeet]", i, 0),
        trySetText("input[name=heightUSInches]", e, 1),
        trySetText("input[name=heightImperialFeet]", i, 0),
        trySetText("input[name=heightImperialInches]", e, 1),
        t
      );
    }
    if (1 == units) {
      var s = tryGetText("input[name=heightUSFeet]", 1, 9),
        n = tryGetText("input[name=heightUSInches]", 0, 12);
      n += 12 * s;
      var t = n / 39.3701;
      return (
        trySetText("input[name=heightMetricMeters]", t, 2),
        trySetText(
          "input[name=heightImperialFeet]",
          tryGetText("input[name=heightUSFeet]", 1, 9),
          0
        ),
        trySetText(
          "input[name=heightImperialInches]",
          tryGetText("input[name=heightUSInches]", 0, 12),
          1
        ),
        t
      );
    }
    var s = tryGetText("input[name=heightImperialFeet]", 1, 9),
      n = tryGetText("input[name=heightImperialInches]", 0, 12);
    n += 12 * s;
    var t = n / 39.3701;
    return (
      trySetText("input[name=heightMetricMeters]", t, 2),
      trySetText(
        "input[name=heightUSFeet]",
        tryGetText("input[name=heightImperialFeet]", 1, 9),
        0
      ),
      trySetText(
        "input[name=heightUSInches]",
        tryGetText("input[name=heightImperialInches]", 0, 12),
        1
      ),
      t
    );
  }
  
  function getActivity() {
    var t = jQuery("input[name=activity_radio]:checked");
    return (
      setCookie(getCookieId("input[name=activity_radio]:checked"), t.val(), 30),
      parseFloat(t.val()) / 4
    );
  }
  
  function getBodyfat() {
    return tryGetText("input[name=bodyfat]", 1, 80);
  }
  
  function getNetCarbs() {
    return tryGetText("input[name=netcarbs]", 0, 500);
  }
  
  function readData() {
    var t = jQuery("input[name=units_switcher]");
    setCookie(getCookieId("input[name=units_switcher]"), t.attr("checked"), 30),
      undefined === t.attr("checked")
        ? ((units = 0),
          jQuery(".calcMetric").show(),
          jQuery(".calcUS").hide(),
          jQuery(".calcImperial").hide())
        : "checked" === t.attr("checked")
        ? ((units = 1),
          jQuery(".calcMetric").hide(),
          jQuery(".calcUS").show(),
          jQuery(".calcImperial").hide())
        : ((units = 2),
          jQuery(".calcMetric").hide(),
          jQuery(".calcUS").hide(),
          jQuery(".calcImperial").show()),
      (kdBuddy = new ketoDietBuddy().init({
        gender: getGender(),
        age: getAge(),
        weight: getWeight(),
        height: 100 * getHeight(),
        activityLevel: getActivity(),
        bodyfat: getBodyfat(),
        netCarbs: getNetCarbs(),
      }));
  }
  
  function rebuildUI(t, e) {
    var i = kdBuddy.calculateCalorieIntake(0);
    if (
      (updateResults(0, "resultsZeroDeficit", null),
      jQuery(".kdbEssentialFat").text(kdBuddy.essentialBodyFat.toFixed(0)),
      jQuery("#kdbBMR").text(kdBuddy.bmr.toFixed(0)),
      jQuery("p.kdbWarning").hide(),
      (i.warnings & WarningsEnum.BODYFATTOOLOW) == WarningsEnum.BODYFATTOOLOW &&
        jQuery("p.kdbWarning.kdbBODYFATTOOLOW").show(),
      (i.warnings & WarningsEnum.CARBSTOOHIGH) == WarningsEnum.CARBSTOOHIGH &&
        jQuery("p.kdbWarning.kdbCARBSTOOHIGH").show(),
      "0" === t)
    )
      if (
        (jQuery("#resultsLosingWeight").show(),
        jQuery("#resultsGainingWeight").hide(),
        jQuery("#goalCustom").hide(),
        jQuery("#resultsCustom").hide(),
        (i.warnings & WarningsEnum.BODYFATTOOLOW) != WarningsEnum.BODYFATTOOLOW &&
          (i.warnings & WarningsEnum.CARBSTOOHIGH) != WarningsEnum.CARBSTOOHIGH)
      ) {
        var s = i.minimum.energy,
          n = i.maintenance.energy;
        1e3 > s && (s = 1e3);
        var a = (n - s) / 4,
          o = Math.round((100 * a) / n);
        if (((o = parseFloat(o.toFixed(0))), 0 >= o))
          jQuery("p.kdbWarning.kdbNOWEIGHTLOSSSUGGESTIONS").show(),
            jQuery("#resultsLosingWeight").hide();
        else {
          var h = -o,
            r = 2 * -o,
            l = 3 * -o;
          updateResults(
            h,
            "resultsSmallDeficit",
            "Small calorie deficit (" + (-h).toFixed(0) + "%)"
          ),
            updateResults(
              r,
              "resultsMediumDeficit",
              "Moderate calorie deficit (" + (-r).toFixed(0) + "%)"
            ),
            updateResults(
              l,
              "resultsLargeDeficit",
              "Large calorie deficit (" + (-l).toFixed(0) + "%)"
            );
        }
      } else jQuery("#resultsLosingWeight").hide();
    else
      "1" === t
        ? (jQuery("#resultsLosingWeight").hide(),
          jQuery("#resultsGainingWeight").show(),
          jQuery("#goalCustom").hide(),
          jQuery("#resultsCustom").hide(),
          jQuery("p.kdbWarning.kdbCARBSTOOHIGH").hide(),
          updateResults(10, "resultsSmallSurplus", "Calorie surplus (10%)"),
          updateResults(15, "resultsMediumSurplus", "Calorie surplus (15%)"),
          updateResults(20, "resultsLargeSurplus", "Calorie surplus (20%)"))
        : (jQuery("#resultsLosingWeight").hide(),
          jQuery("#resultsGainingWeight").hide(),
          jQuery("#goalCustom").show(),
          jQuery("#resultsCustom").show(),
          updateResults(
            e,
            "resultsCustomContent",
            "Custom adjustment (" + e.toFixed(0) + "%)"
          ));
  }
  
  function updateResults(t, e, i) {
    kdBuddy.renderResults(
      kdBuddy.calculateCalorieIntake(t),
      document.getElementById(e),
      i
    );
  }
  
  function reloadUI() {
    readData();
    var t = jQuery("input[name=goal_radio]:checked"),
      e = tryGetText("input[name=customCalorieAdjustment]", -100, 300);
    (e = parseFloat(e.toFixed(0))), rebuildUI(t.val(), e);
  }
  
  function adjust_canvas_for_lower_width() {
    jQuery("#ketoDietBuddy").width() <= 525 &&
      0 == navigator.userAgent.match(/Android|webOS|iPhone|iPod|Blackberry/i) &&
      (jQuery("#ketoDietBuddy canvas").css("width", "100%"),
      jQuery("#ketoDietBuddy canvas").css("height", "100%"),
      jQuery("#ketoDietBuddy .kdbEnergyOverview").css("width", "100%"));
  }
  (function () {
    "use strict";
    var t = this,
      e = t.Chart,
      i = function (t) {
        (this.canvas = t.canvas), (this.ctx = t);
        var e = function (t, e) {
            return t["offset" + e]
              ? t["offset" + e]
              : document.defaultView.getComputedStyle(t).getPropertyValue(e);
          },
          i = (this.width = e(t.canvas, "Width")),
          n = (this.height = e(t.canvas, "Height"));
        (t.canvas.width = i), (t.canvas.height = n);
        var i = (this.width = t.canvas.width),
          n = (this.height = t.canvas.height);
        return (
          (this.aspectRatio = this.width / this.height), s.retinaScale(this), this
        );
      };
    (i.defaults = {
      global: {
        animation: !0,
        animationSteps: 60,
        animationEasing: "easeOutQuart",
        showScale: !0,
        scaleOverride: !1,
        scaleSteps: null,
        scaleStepWidth: null,
        scaleStartValue: null,
        scaleLineColor: "rgba(0,0,0,.1)",
        scaleLineWidth: 1,
        scaleShowLabels: !0,
        scaleLabel: "<%=value%>",
        scaleIntegersOnly: !0,
        scaleBeginAtZero: !1,
        scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        scaleFontSize: 12,
        scaleFontStyle: "normal",
        scaleFontColor: "#666",
        responsive: !1,
        maintainAspectRatio: !0,
        showTooltips: !0,
        customTooltips: !1,
        tooltipEvents: ["mousemove", "touchstart", "touchmove", "mouseout"],
        tooltipFillColor: "rgba(0,0,0,0.8)",
        tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipFontSize: 14,
        tooltipFontStyle: "normal",
        tooltipFontColor: "#fff",
        tooltipTitleFontFamily:
          "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        tooltipTitleFontSize: 14,
        tooltipTitleFontStyle: "bold",
        tooltipTitleFontColor: "#fff",
        tooltipYPadding: 6,
        tooltipXPadding: 6,
        tooltipCaretSize: 8,
        tooltipCornerRadius: 6,
        tooltipXOffset: 10,
        tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
        multiTooltipTemplate: "<%= value %>",
        multiTooltipKeyBackground: "#fff",
        onAnimationProgress: function () {},
        onAnimationComplete: function () {},
      },
    }),
      (i.types = {});
    var s = (i.helpers = {}),
      n = (s.each = function (t, e, i) {
        var s = Array.prototype.slice.call(arguments, 3);
        if (t)
          if (t.length === +t.length) {
            var n;
            for (n = 0; n < t.length; n++) e.apply(i, [t[n], n].concat(s));
          } else for (var a in t) e.apply(i, [t[a], a].concat(s));
      }),
      a = (s.clone = function (t) {
        var e = {};
        return (
          n(t, function (i, s) {
            t.hasOwnProperty(s) && (e[s] = i);
          }),
          e
        );
      }),
      o = (s.extend = function (t) {
        return (
          n(Array.prototype.slice.call(arguments, 1), function (e) {
            n(e, function (i, s) {
              e.hasOwnProperty(s) && (t[s] = i);
            });
          }),
          t
        );
      }),
      h = (s.merge = function (t, e) {
        var i = Array.prototype.slice.call(arguments, 0);
        return i.unshift({}), o.apply(null, i);
      }),
      r = (s.indexOf = function (t, e) {
        if (Array.prototype.indexOf) return t.indexOf(e);
        for (var i = 0; i < t.length; i++) if (t[i] === e) return i;
        return -1;
      }),
      l =
        ((s.where = function (t, e) {
          var i = [];
          return (
            s.each(t, function (t) {
              e(t) && i.push(t);
            }),
            i
          );
        }),
        (s.findNextWhere = function (t, e, i) {
          i || (i = -1);
          for (var s = i + 1; s < t.length; s++) {
            var n = t[s];
            if (e(n)) return n;
          }
        }),
        (s.findPreviousWhere = function (t, e, i) {
          i || (i = t.length);
          for (var s = i - 1; s >= 0; s--) {
            var n = t[s];
            if (e(n)) return n;
          }
        }),
        (s.inherits = function (t) {
          var e = this,
            i =
              t && t.hasOwnProperty("constructor")
                ? t.constructor
                : function () {
                    return e.apply(this, arguments);
                  },
            s = function () {
              this.constructor = i;
            };
          return (
            (s.prototype = e.prototype),
            (i.prototype = new s()),
            (i.extend = l),
            t && o(i.prototype, t),
            (i.__super__ = e.prototype),
            i
          );
        })),
      c = (s.noop = function () {}),
      u = (s.uid = (function () {
        var t = 0;
        return function () {
          return "chart-" + t++;
        };
      })()),
      d = (s.warn = function (t) {
        window.console &&
          "function" == typeof window.console.warn &&
          console.warn(t);
      }),
      p = (s.amd = "function" == typeof define && define.amd),
      g = (s.isNumber = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t);
      }),
      f = (s.max = function (t) {
        return Math.max.apply(Math, t);
      }),
      m = (s.min = function (t) {
        return Math.min.apply(Math, t);
      }),
      v =
        ((s.cap = function (t, e, i) {
          if (g(e)) {
            if (t > e) return e;
          } else if (g(i) && i > t) return i;
          return t;
        }),
        (s.getDecimalPlaces = function (t) {
          return t % 1 !== 0 && g(t) ? t.toString().split(".")[1].length : 0;
        })),
      y = (s.radians = function (t) {
        return t * (Math.PI / 180);
      }),
      b =
        ((s.getAngleFromPoint = function (t, e) {
          var i = e.x - t.x,
            s = e.y - t.y,
            n = Math.sqrt(i * i + s * s),
            a = 2 * Math.PI + Math.atan2(s, i);
          return (
            0 > i && 0 > s && (a += 2 * Math.PI),
            {
              angle: a,
              distance: n,
            }
          );
        }),
        (s.aliasPixel = function (t) {
          return t % 2 === 0 ? 0 : 0.5;
        })),
      S =
        ((s.splineCurve = function (t, e, i, s) {
          var n = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)),
            a = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2)),
            o = (s * n) / (n + a),
            h = (s * a) / (n + a);
          return {
            inner: {
              x: e.x - o * (i.x - t.x),
              y: e.y - o * (i.y - t.y),
            },
            outer: {
              x: e.x + h * (i.x - t.x),
              y: e.y + h * (i.y - t.y),
            },
          };
        }),
        (s.calculateOrderOfMagnitude = function (t) {
          return Math.floor(Math.log(t) / Math.LN10);
        })),
      x =
        ((s.calculateScaleRange = function (t, e, i, s, n) {
          var a = 2,
            o = Math.floor(e / (1.5 * i)),
            h = a >= o,
            r = f(t),
            l = m(t);
          r === l && ((r += 0.5), l >= 0.5 && !s ? (l -= 0.5) : (r += 0.5));
          for (
            var c = Math.abs(r - l),
              u = S(c),
              d = Math.ceil(r / (1 * Math.pow(10, u))) * Math.pow(10, u),
              p = s ? 0 : Math.floor(l / (1 * Math.pow(10, u))) * Math.pow(10, u),
              g = d - p,
              v = Math.pow(10, u),
              y = Math.round(g / v);
            (y > o || o > 2 * y) && !h;
  
          )
            if (y > o) (v *= 2), (y = Math.round(g / v)), y % 1 !== 0 && (h = !0);
            else if (n && u >= 0) {
              if ((v / 2) % 1 !== 0) break;
              (v /= 2), (y = Math.round(g / v));
            } else (v /= 2), (y = Math.round(g / v));
          return (
            h && ((y = a), (v = g / y)),
            {
              steps: y,
              stepValue: v,
              min: p,
              max: p + y * v,
            }
          );
        }),
        (s.template = function (t, e) {
          function i(t, e) {
            var i = /\W/.test(t)
              ? new Function(
                  "obj",
                  "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" +
                    t
                      .replace(/[\r\t\n]/g, " ")
                      .split("<%")
                      .join("	")
                      .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                      .replace(/\t=(.*?)%>/g, "',$1,'")
                      .split("	")
                      .join("');")
                      .split("%>")
                      .join("p.push('")
                      .split("\r")
                      .join("\\'") +
                    "');}return p.join('');"
                )
              : (s[t] = s[t]);
            return e ? i(e) : i;
          }
          if (t instanceof Function) return t(e);
          var s = {};
          return i(t, e);
        })),
      C =
        ((s.generateLabels = function (t, e, i, s) {
          var a = new Array(e);
          return (
            labelTemplateString &&
              n(a, function (e, n) {
                a[n] = x(t, {
                  value: i + s * (n + 1),
                });
              }),
            a
          );
        }),
        (s.easingEffects = {
          linear: function (t) {
            return t;
          },
          easeInQuad: function (t) {
            return t * t;
          },
          easeOutQuad: function (t) {
            return -1 * t * (t - 2);
          },
          easeInOutQuad: function (t) {
            return (t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
          },
          easeInCubic: function (t) {
            return t * t * t;
          },
          easeOutCubic: function (t) {
            return 1 * ((t = t / 1 - 1) * t * t + 1);
          },
          easeInOutCubic: function (t) {
            return (t /= 0.5) < 1
              ? 0.5 * t * t * t
              : 0.5 * ((t -= 2) * t * t + 2);
          },
          easeInQuart: function (t) {
            return t * t * t * t;
          },
          easeOutQuart: function (t) {
            return -1 * ((t = t / 1 - 1) * t * t * t - 1);
          },
          easeInOutQuart: function (t) {
            return (t /= 0.5) < 1
              ? 0.5 * t * t * t * t
              : -0.5 * ((t -= 2) * t * t * t - 2);
          },
          easeInQuint: function (t) {
            return 1 * (t /= 1) * t * t * t * t;
          },
          easeOutQuint: function (t) {
            return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
          },
          easeInOutQuint: function (t) {
            return (t /= 0.5) < 1
              ? 0.5 * t * t * t * t * t
              : 0.5 * ((t -= 2) * t * t * t * t + 2);
          },
          easeInSine: function (t) {
            return -1 * Math.cos((t / 1) * (Math.PI / 2)) + 1;
          },
          easeOutSine: function (t) {
            return 1 * Math.sin((t / 1) * (Math.PI / 2));
          },
          easeInOutSine: function (t) {
            return -0.5 * (Math.cos((Math.PI * t) / 1) - 1);
          },
          easeInExpo: function (t) {
            return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
          },
          easeOutExpo: function (t) {
            return 1 === t ? 1 : 1 * (-Math.pow(2, (-10 * t) / 1) + 1);
          },
          easeInOutExpo: function (t) {
            return 0 === t
              ? 0
              : 1 === t
              ? 1
              : (t /= 0.5) < 1
              ? 0.5 * Math.pow(2, 10 * (t - 1))
              : 0.5 * (-Math.pow(2, -10 * --t) + 2);
          },
          easeInCirc: function (t) {
            return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
          },
          easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
          },
          easeInOutCirc: function (t) {
            return (t /= 0.5) < 1
              ? -0.5 * (Math.sqrt(1 - t * t) - 1)
              : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
          },
          easeInElastic: function (t) {
            var e = 1.70158,
              i = 0,
              s = 1;
            return 0 === t
              ? 0
              : 1 == (t /= 1)
              ? 1
              : (i || (i = 0.3),
                s < Math.abs(1)
                  ? ((s = 1), (e = i / 4))
                  : (e = (i / (2 * Math.PI)) * Math.asin(1 / s)),
                -(
                  s *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((1 * t - e) * (2 * Math.PI)) / i)
                ));
          },
          easeOutElastic: function (t) {
            var e = 1.70158,
              i = 0,
              s = 1;
            return 0 === t
              ? 0
              : 1 == (t /= 1)
              ? 1
              : (i || (i = 0.3),
                s < Math.abs(1)
                  ? ((s = 1), (e = i / 4))
                  : (e = (i / (2 * Math.PI)) * Math.asin(1 / s)),
                s *
                  Math.pow(2, -10 * t) *
                  Math.sin(((1 * t - e) * (2 * Math.PI)) / i) +
                  1);
          },
          easeInOutElastic: function (t) {
            var e = 1.70158,
              i = 0,
              s = 1;
            return 0 === t
              ? 0
              : 2 == (t /= 0.5)
              ? 1
              : (i || (i = 1 * (0.3 * 1.5)),
                s < Math.abs(1)
                  ? ((s = 1), (e = i / 4))
                  : (e = (i / (2 * Math.PI)) * Math.asin(1 / s)),
                1 > t
                  ? -0.5 *
                    (s *
                      Math.pow(2, 10 * (t -= 1)) *
                      Math.sin(((1 * t - e) * (2 * Math.PI)) / i))
                  : s *
                      Math.pow(2, -10 * (t -= 1)) *
                      Math.sin(((1 * t - e) * (2 * Math.PI)) / i) *
                      0.5 +
                    1);
          },
          easeInBack: function (t) {
            var e = 1.70158;
            return 1 * (t /= 1) * t * ((e + 1) * t - e);
          },
          easeOutBack: function (t) {
            var e = 1.70158;
            return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1);
          },
          easeInOutBack: function (t) {
            var e = 1.70158;
            return (t /= 0.5) < 1
              ? 0.5 * (t * t * (((e *= 1.525) + 1) * t - e))
              : 0.5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2);
          },
          easeInBounce: function (t) {
            return 1 - C.easeOutBounce(1 - t);
          },
          easeOutBounce: function (t) {
            return (t /= 1) < 1 / 2.75
              ? 1 * (7.5625 * t * t)
              : 2 / 2.75 > t
              ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75)
              : 2.5 / 2.75 > t
              ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375)
              : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375);
          },
          easeInOutBounce: function (t) {
            return 0.5 > t
              ? 0.5 * C.easeInBounce(2 * t)
              : 0.5 * C.easeOutBounce(2 * t - 1) + 0.5;
          },
        })),
      w = (s.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (t) {
            return window.setTimeout(t, 1e3 / 60);
          }
        );
      })()),
      k = (s.cancelAnimFrame = (function () {
        return (
          window.cancelAnimationFrame ||
          window.webkitCancelAnimationFrame ||
          window.mozCancelAnimationFrame ||
          window.oCancelAnimationFrame ||
          window.msCancelAnimationFrame ||
          function (t) {
            return window.clearTimeout(t, 1e3 / 60);
          }
        );
      })()),
      P =
        ((s.animationLoop = function (t, e, i, s, n, a) {
          var o = 0,
            h = C[i] || C.linear,
            r = function () {
              o++;
              var i = o / e,
                l = h(i);
              t.call(a, l, i, o),
                s.call(a, l, i),
                e > o ? (a.animationFrame = w(r)) : n.apply(a);
            };
          w(r);
        }),
        (s.getRelativePosition = function (t) {
          var e,
            i,
            s = t.originalEvent || t,
            n = t.currentTarget || t.srcElement,
            a = n.getBoundingClientRect();
          return (
            s.touches
              ? ((e = s.touches[0].clientX - a.left),
                (i = s.touches[0].clientY - a.top))
              : ((e = s.clientX - a.left), (i = s.clientY - a.top)),
            {
              x: e,
              y: i,
            }
          );
        }),
        (s.addEvent = function (t, e, i) {
          t.addEventListener
            ? t.addEventListener(e, i)
            : t.attachEvent
            ? t.attachEvent("on" + e, i)
            : (t["on" + e] = i);
        })),
      L = (s.removeEvent = function (t, e, i) {
        t.removeEventListener
          ? t.removeEventListener(e, i, !1)
          : t.detachEvent
          ? t.detachEvent("on" + e, i)
          : (t["on" + e] = c);
      }),
      F =
        ((s.bindEvents = function (t, e, i) {
          t.events || (t.events = {}),
            n(e, function (e) {
              (t.events[e] = function () {
                i.apply(t, arguments);
              }),
                P(t.chart.canvas, e, t.events[e]);
            });
        }),
        (s.unbindEvents = function (t, e) {
          n(e, function (e, i) {
            L(t.chart.canvas, i, e);
          });
        })),
      T = (s.getMaximumWidth = function (t) {
        var e = t.parentNode;
        return e.clientWidth;
      }),
      A = (s.getMaximumHeight = function (t) {
        var e = t.parentNode;
        return e.clientHeight;
      }),
      M =
        ((s.getMaximumSize = s.getMaximumWidth),
        (s.retinaScale = function (t) {
          var e = t.ctx,
            i = t.canvas.width,
            s = t.canvas.height;
          window.devicePixelRatio &&
            ((e.canvas.style.width = i + "px"),
            (e.canvas.style.height = s + "px"),
            (e.canvas.height = s * window.devicePixelRatio),
            (e.canvas.width = i * window.devicePixelRatio),
            e.scale(window.devicePixelRatio, window.devicePixelRatio));
        })),
      R = (s.clear = function (t) {
        t.ctx.clearRect(0, 0, t.width, t.height);
      }),
      W = (s.fontString = function (t, e, i) {
        return e + " " + t + "px " + i;
      }),
      I = (s.longestText = function (t, e, i) {
        t.font = e;
        var s = 0;
        return (
          n(i, function (e) {
            var i = t.measureText(e).width;
            s = i > s ? i : s;
          }),
          s
        );
      }),
      O = (s.drawRoundedRectangle = function (t, e, i, s, n, a) {
        t.beginPath(),
          t.moveTo(e + a, i),
          t.lineTo(e + s - a, i),
          t.quadraticCurveTo(e + s, i, e + s, i + a),
          t.lineTo(e + s, i + n - a),
          t.quadraticCurveTo(e + s, i + n, e + s - a, i + n),
          t.lineTo(e + a, i + n),
          t.quadraticCurveTo(e, i + n, e, i + n - a),
          t.lineTo(e, i + a),
          t.quadraticCurveTo(e, i, e + a, i),
          t.closePath();
      });
    (i.instances = {}),
      (i.Type = function (t, e, s) {
        (this.options = e),
          (this.chart = s),
          (this.id = u()),
          (i.instances[this.id] = this),
          e.responsive && this.resize(),
          this.initialize.call(this, t);
      }),
      o(i.Type.prototype, {
        initialize: function () {
          return this;
        },
        clear: function () {
          return R(this.chart), this;
        },
        stop: function () {
          return k(this.animationFrame), this;
        },
        resize: function (t) {
          this.stop();
          var e = this.chart.canvas,
            i = T(this.chart.canvas),
            s = this.options.maintainAspectRatio
              ? i / this.chart.aspectRatio
              : A(this.chart.canvas);
          return (
            (e.width = this.chart.width = i),
            (e.height = this.chart.height = s),
            M(this.chart),
            "function" == typeof t &&
              t.apply(this, Array.prototype.slice.call(arguments, 1)),
            this
          );
        },
        reflow: c,
        render: function (t) {
          return (
            t && this.reflow(),
            this.options.animation && !t
              ? s.animationLoop(
                  this.draw,
                  this.options.animationSteps,
                  this.options.animationEasing,
                  this.options.onAnimationProgress,
                  this.options.onAnimationComplete,
                  this
                )
              : (this.draw(), this.options.onAnimationComplete.call(this)),
            this
          );
        },
        generateLegend: function () {
          return x(this.options.legendTemplate, this);
        },
        destroy: function () {
          this.clear(), F(this, this.events);
          var t = this.chart.canvas;
          (t.width = this.chart.width),
            (t.height = this.chart.height),
            t.style.removeProperty
              ? (t.style.removeProperty("width"),
                t.style.removeProperty("height"))
              : (t.style.removeAttribute("width"),
                t.style.removeAttribute("height")),
            delete i.instances[this.id];
        },
        showTooltip: function (t, e) {
          "undefined" == typeof this.activeElements && (this.activeElements = []);
          var a = function (t) {
            var e = !1;
            return t.length !== this.activeElements.length
              ? (e = !0)
              : (n(
                  t,
                  function (t, i) {
                    t !== this.activeElements[i] && (e = !0);
                  },
                  this
                ),
                e);
          }.call(this, t);
          if (a || e) {
            if (
              ((this.activeElements = t),
              this.draw(),
              this.options.customTooltips && this.options.customTooltips(!1),
              t.length > 0)
            )
              if (this.datasets && this.datasets.length > 1) {
                for (
                  var o, h, l = this.datasets.length - 1;
                  l >= 0 &&
                  ((o =
                    this.datasets[l].points ||
                    this.datasets[l].bars ||
                    this.datasets[l].segments),
                  (h = r(o, t[0])),
                  -1 === h);
                  l--
                );
                var c = [],
                  u = [],
                  d = function (t) {
                    var e,
                      i,
                      n,
                      a,
                      o,
                      r = [],
                      l = [],
                      d = [];
                    return (
                      s.each(this.datasets, function (t) {
                        (e = t.points || t.bars || t.segments),
                          e[h] && e[h].hasValue() && r.push(e[h]);
                      }),
                      s.each(
                        r,
                        function (t) {
                          l.push(t.x),
                            d.push(t.y),
                            c.push(
                              s.template(this.options.multiTooltipTemplate, t)
                            ),
                            u.push({
                              fill: t._saved.fillColor || t.fillColor,
                              stroke: t._saved.strokeColor || t.strokeColor,
                            });
                        },
                        this
                      ),
                      (o = m(d)),
                      (n = f(d)),
                      (a = m(l)),
                      (i = f(l)),
                      {
                        x: a > this.chart.width / 2 ? a : i,
                        y: (o + n) / 2,
                      }
                    );
                  }.call(this, h);
                new i.MultiTooltip({
                  x: d.x,
                  y: d.y,
                  xPadding: this.options.tooltipXPadding,
                  yPadding: this.options.tooltipYPadding,
                  xOffset: this.options.tooltipXOffset,
                  fillColor: this.options.tooltipFillColor,
                  textColor: this.options.tooltipFontColor,
                  fontFamily: this.options.tooltipFontFamily,
                  fontStyle: this.options.tooltipFontStyle,
                  fontSize: this.options.tooltipFontSize,
                  titleTextColor: this.options.tooltipTitleFontColor,
                  titleFontFamily: this.options.tooltipTitleFontFamily,
                  titleFontStyle: this.options.tooltipTitleFontStyle,
                  titleFontSize: this.options.tooltipTitleFontSize,
                  cornerRadius: this.options.tooltipCornerRadius,
                  labels: c,
                  legendColors: u,
                  legendColorBackground: this.options.multiTooltipKeyBackground,
                  title: t[0].label,
                  chart: this.chart,
                  ctx: this.chart.ctx,
                  custom: this.options.customTooltips,
                }).draw();
              } else
                n(
                  t,
                  function (t) {
                    var e = t.tooltipPosition();
                    new i.Tooltip({
                      x: Math.round(e.x),
                      y: Math.round(e.y),
                      xPadding: this.options.tooltipXPadding,
                      yPadding: this.options.tooltipYPadding,
                      fillColor: this.options.tooltipFillColor,
                      textColor: this.options.tooltipFontColor,
                      fontFamily: this.options.tooltipFontFamily,
                      fontStyle: this.options.tooltipFontStyle,
                      fontSize: this.options.tooltipFontSize,
                      caretHeight: this.options.tooltipCaretSize,
                      cornerRadius: this.options.tooltipCornerRadius,
                      text: x(this.options.tooltipTemplate, t),
                      chart: this.chart,
                      custom: this.options.customTooltips,
                    }).draw();
                  },
                  this
                );
            return this;
          }
        },
        toBase64Image: function () {
          return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
        },
      }),
      (i.Type.extend = function (t) {
        var e = this,
          s = function () {
            return e.apply(this, arguments);
          };
        if (
          ((s.prototype = a(e.prototype)),
          o(s.prototype, t),
          (s.extend = i.Type.extend),
          t.name || e.prototype.name)
        ) {
          var n = t.name || e.prototype.name,
            r = i.defaults[e.prototype.name]
              ? a(i.defaults[e.prototype.name])
              : {};
          (i.defaults[n] = o(r, t.defaults)),
            (i.types[n] = s),
            (i.prototype[n] = function (t, e) {
              var a = h(i.defaults.global, i.defaults[n], e || {});
              return new s(t, a, this);
            });
        } else
          d("Name not provided for this chart, so it hasn't been registered");
        return e;
      }),
      (i.Element = function (t) {
        o(this, t), this.initialize.apply(this, arguments), this.save();
      }),
      o(i.Element.prototype, {
        initialize: function () {},
        restore: function (t) {
          return (
            t
              ? n(
                  t,
                  function (t) {
                    this[t] = this._saved[t];
                  },
                  this
                )
              : o(this, this._saved),
            this
          );
        },
        save: function () {
          return (this._saved = a(this)), delete this._saved._saved, this;
        },
        update: function (t) {
          return (
            n(
              t,
              function (t, e) {
                (this._saved[e] = this[e]), (this[e] = t);
              },
              this
            ),
            this
          );
        },
        transition: function (t, e) {
          return (
            n(
              t,
              function (t, i) {
                this[i] = (t - this._saved[i]) * e + this._saved[i];
              },
              this
            ),
            this
          );
        },
        tooltipPosition: function () {
          return {
            x: this.x,
            y: this.y,
          };
        },
        hasValue: function () {
          return g(this.value);
        },
      }),
      (i.Element.extend = l),
      (i.Point = i.Element.extend({
        display: !0,
        inRange: function (t, e) {
          var i = this.hitDetectionRadius + this.radius;
          return (
            Math.pow(t - this.x, 2) + Math.pow(e - this.y, 2) < Math.pow(i, 2)
          );
        },
        draw: function () {
          if (this.display) {
            var t = this.ctx;
            t.beginPath(),
              t.arc(this.x, this.y, this.radius, 0, 2 * Math.PI),
              t.closePath(),
              (t.strokeStyle = this.strokeColor),
              (t.lineWidth = this.strokeWidth),
              (t.fillStyle = this.fillColor),
              t.fill(),
              t.stroke();
          }
        },
      })),
      (i.Arc = i.Element.extend({
        inRange: function (t, e) {
          var i = s.getAngleFromPoint(this, {
              x: t,
              y: e,
            }),
            n = i.angle >= this.startAngle && i.angle <= this.endAngle,
            a = i.distance >= this.innerRadius && i.distance <= this.outerRadius;
          return n && a;
        },
        tooltipPosition: function () {
          var t = this.startAngle + (this.endAngle - this.startAngle) / 2,
            e = (this.outerRadius - this.innerRadius) / 2 + this.innerRadius;
          return {
            x: this.x + Math.cos(t) * e,
            y: this.y + Math.sin(t) * e,
          };
        },
        // draw: function(t) {
        //     var e = this.ctx;
        //     e.beginPath(), e.arc(this.x, this.y, this.outerRadius, this.startAngle, this.endAngle), e.arc(this.x, this.y, this.innerRadius, this.endAngle, this.startAngle, !0), e.closePath(), e.strokeStyle = this.strokeColor, e.lineWidth = this.strokeWidth, e.fillStyle = this.fillColor, e.fill(), e.lineJoin = "bevel", this.showStroke && e.stroke()
        // }
      })),
      (i.Rectangle = i.Element.extend({
        draw: function () {
          var t = this.ctx,
            e = this.width / 2,
            i = this.x - e,
            s = this.x + e,
            n = this.base - (this.base - this.y),
            a = this.strokeWidth / 2;
          this.showStroke && ((i += a), (s -= a), (n += a)),
            t.beginPath(),
            (t.fillStyle = this.fillColor),
            (t.strokeStyle = this.strokeColor),
            (t.lineWidth = this.strokeWidth),
            t.moveTo(i, this.base),
            t.lineTo(i, n),
            t.lineTo(s, n),
            t.lineTo(s, this.base),
            t.fill(),
            this.showStroke && t.stroke();
        },
        height: function () {
          return this.base - this.y;
        },
        inRange: function (t, e) {
          return (
            t >= this.x - this.width / 2 &&
            t <= this.x + this.width / 2 &&
            e >= this.y &&
            e <= this.base
          );
        },
      })),
      (i.Tooltip = i.Element.extend({
        draw: function () {
          var t = this.chart.ctx;
          (t.font = W(this.fontSize, this.fontStyle, this.fontFamily)),
            (this.xAlign = "center"),
            (this.yAlign = "above");
          var e = (this.caretPadding = 2),
            i = t.measureText(this.text).width + 2 * this.xPadding,
            s = this.fontSize + 2 * this.yPadding,
            n = s + this.caretHeight + e;
          this.x + i / 2 > this.chart.width
            ? (this.xAlign = "left")
            : this.x - i / 2 < 0 && (this.xAlign = "right"),
            this.y - n < 0 && (this.yAlign = "below");
          var a = this.x - i / 2,
            o = this.y - n;
          if (((t.fillStyle = this.fillColor), this.custom)) this.custom(this);
          else {
            switch (this.yAlign) {
              case "above":
                t.beginPath(),
                  t.moveTo(this.x, this.y - e),
                  t.lineTo(
                    this.x + this.caretHeight,
                    this.y - (e + this.caretHeight)
                  ),
                  t.lineTo(
                    this.x - this.caretHeight,
                    this.y - (e + this.caretHeight)
                  ),
                  t.closePath(),
                  t.fill();
                break;
              case "below":
                (o = this.y + e + this.caretHeight),
                  t.beginPath(),
                  t.moveTo(this.x, this.y + e),
                  t.lineTo(
                    this.x + this.caretHeight,
                    this.y + e + this.caretHeight
                  ),
                  t.lineTo(
                    this.x - this.caretHeight,
                    this.y + e + this.caretHeight
                  ),
                  t.closePath(),
                  t.fill();
            }
            switch (this.xAlign) {
              case "left":
                a = this.x - i + (this.cornerRadius + this.caretHeight);
                break;
              case "right":
                a = this.x - (this.cornerRadius + this.caretHeight);
            }
            O(t, a, o, i, s, this.cornerRadius),
              t.fill(),
              (t.fillStyle = this.textColor),
              (t.textAlign = "center"),
              (t.textBaseline = "middle"),
              t.fillText(this.text, a + i / 2, o + s / 2);
          }
        },
      })),
      (i.MultiTooltip = i.Element.extend({
        initialize: function () {
          (this.font = W(this.fontSize, this.fontStyle, this.fontFamily)),
            (this.titleFont = W(
              this.titleFontSize,
              this.titleFontStyle,
              this.titleFontFamily
            )),
            (this.height =
              this.labels.length * this.fontSize +
              (this.labels.length - 1) * (this.fontSize / 2) +
              2 * this.yPadding +
              1.5 * this.titleFontSize),
            (this.ctx.font = this.titleFont);
          var t = this.ctx.measureText(this.title).width,
            e = I(this.ctx, this.font, this.labels) + this.fontSize + 3,
            i = f([e, t]);
          this.width = i + 2 * this.xPadding;
          var s = this.height / 2;
          this.y - s < 0
            ? (this.y = s)
            : this.y + s > this.chart.height && (this.y = this.chart.height - s),
            this.x > this.chart.width / 2
              ? (this.x -= this.xOffset + this.width)
              : (this.x += this.xOffset);
        },
        getLineHeight: function (t) {
          var e = this.y - this.height / 2 + this.yPadding,
            i = t - 1;
          return 0 === t
            ? e + this.titleFontSize / 2
            : e +
                (1.5 * this.fontSize * i + this.fontSize / 2) +
                1.5 * this.titleFontSize;
        },
        draw: function () {
          if (this.custom) this.custom(this);
          else {
            O(
              this.ctx,
              this.x,
              this.y - this.height / 2,
              this.width,
              this.height,
              this.cornerRadius
            );
            var t = this.ctx;
            (t.fillStyle = this.fillColor),
              t.fill(),
              t.closePath(),
              (t.textAlign = "left"),
              (t.textBaseline = "middle"),
              (t.fillStyle = this.titleTextColor),
              (t.font = this.titleFont),
              t.fillText(
                this.title,
                this.x + this.xPadding,
                this.getLineHeight(0)
              ),
              (t.font = this.font),
              s.each(
                this.labels,
                function (e, i) {
                  (t.fillStyle = this.textColor),
                    t.fillText(
                      e,
                      this.x + this.xPadding + this.fontSize + 3,
                      this.getLineHeight(i + 1)
                    ),
                    (t.fillStyle = this.legendColorBackground),
                    t.fillRect(
                      this.x + this.xPadding,
                      this.getLineHeight(i + 1) - this.fontSize / 2,
                      this.fontSize,
                      this.fontSize
                    ),
                    (t.fillStyle = this.legendColors[i].fill),
                    t.fillRect(
                      this.x + this.xPadding,
                      this.getLineHeight(i + 1) - this.fontSize / 2,
                      this.fontSize,
                      this.fontSize
                    );
                },
                this
              );
          }
        },
      })),
      (i.Scale = i.Element.extend({
        initialize: function () {
          this.fit();
        },
        buildYLabels: function () {
          this.yLabels = [];
          for (var t = v(this.stepValue), e = 0; e <= this.steps; e++)
            this.yLabels.push(
              x(this.templateString, {
                value: (this.min + e * this.stepValue).toFixed(t),
              })
            );
          this.yLabelWidth =
            this.display && this.showLabels
              ? I(this.ctx, this.font, this.yLabels)
              : 0;
        },
        addXLabel: function (t) {
          this.xLabels.push(t), this.valuesCount++, this.fit();
        },
        removeXLabel: function () {
          this.xLabels.shift(), this.valuesCount--, this.fit();
        },
        fit: function () {
          (this.startPoint = this.display ? this.fontSize : 0),
            (this.endPoint = this.display
              ? this.height - 1.5 * this.fontSize - 5
              : this.height),
            (this.startPoint += this.padding),
            (this.endPoint -= this.padding);
          var t,
            e = this.endPoint - this.startPoint;
          for (
            this.calculateYRange(e),
              this.buildYLabels(),
              this.calculateXLabelRotation();
            e > this.endPoint - this.startPoint;
  
          )
            (e = this.endPoint - this.startPoint),
              (t = this.yLabelWidth),
              this.calculateYRange(e),
              this.buildYLabels(),
              t < this.yLabelWidth && this.calculateXLabelRotation();
        },
        calculateXLabelRotation: function () {
          this.ctx.font = this.font;
          var t,
            e,
            i = this.ctx.measureText(this.xLabels[0]).width,
            s = this.ctx.measureText(this.xLabels[this.xLabels.length - 1]).width;
          if (
            ((this.xScalePaddingRight = s / 2 + 3),
            (this.xScalePaddingLeft =
              i / 2 > this.yLabelWidth + 10 ? i / 2 : this.yLabelWidth + 10),
            (this.xLabelRotation = 0),
            this.display)
          ) {
            var n,
              a = I(this.ctx, this.font, this.xLabels);
            this.xLabelWidth = a;
            for (
              var o = Math.floor(this.calculateX(1) - this.calculateX(0)) - 6;
              (this.xLabelWidth > o && 0 === this.xLabelRotation) ||
              (this.xLabelWidth > o &&
                this.xLabelRotation <= 90 &&
                this.xLabelRotation > 0);
  
            )
              (n = Math.cos(y(this.xLabelRotation))),
                (t = n * i),
                (e = n * s),
                t + this.fontSize / 2 > this.yLabelWidth + 8 &&
                  (this.xScalePaddingLeft = t + this.fontSize / 2),
                (this.xScalePaddingRight = this.fontSize / 2),
                this.xLabelRotation++,
                (this.xLabelWidth = n * a);
            this.xLabelRotation > 0 &&
              (this.endPoint -= Math.sin(y(this.xLabelRotation)) * a + 3);
          } else
            (this.xLabelWidth = 0),
              (this.xScalePaddingRight = this.padding),
              (this.xScalePaddingLeft = this.padding);
        },
        calculateYRange: c,
        drawingArea: function () {
          return this.startPoint - this.endPoint;
        },
        calculateY: function (t) {
          var e = this.drawingArea() / (this.min - this.max);
          return this.endPoint - e * (t - this.min);
        },
        calculateX: function (t) {
          var e =
              (this.xLabelRotation > 0,
              this.width - (this.xScalePaddingLeft + this.xScalePaddingRight)),
            i =
              e / Math.max(this.valuesCount - (this.offsetGridLines ? 0 : 1), 1),
            s = i * t + this.xScalePaddingLeft;
          return this.offsetGridLines && (s += i / 2), Math.round(s);
        },
        update: function (t) {
          s.extend(this, t), this.fit();
        },
        draw: function () {
          var t = this.ctx,
            e = (this.endPoint - this.startPoint) / this.steps,
            i = Math.round(this.xScalePaddingLeft);
          this.display &&
            ((t.fillStyle = this.textColor),
            (t.font = this.font),
            n(
              this.yLabels,
              function (n, a) {
                var o = this.endPoint - e * a,
                  h = Math.round(o),
                  r = this.showHorizontalLines;
                (t.textAlign = "right"),
                  (t.textBaseline = "middle"),
                  this.showLabels && t.fillText(n, i - 10, o),
                  0 !== a || r || (r = !0),
                  r && t.beginPath(),
                  a > 0
                    ? ((t.lineWidth = this.gridLineWidth),
                      (t.strokeStyle = this.gridLineColor))
                    : ((t.lineWidth = this.lineWidth),
                      (t.strokeStyle = this.lineColor)),
                  (h += s.aliasPixel(t.lineWidth)),
                  r &&
                    (t.moveTo(i, h),
                    t.lineTo(this.width, h),
                    t.stroke(),
                    t.closePath()),
                  (t.lineWidth = this.lineWidth),
                  (t.strokeStyle = this.lineColor),
                  t.beginPath(),
                  t.moveTo(i - 5, h),
                  t.lineTo(i, h),
                  t.stroke(),
                  t.closePath();
              },
              this
            ),
            n(
              this.xLabels,
              function (e, i) {
                var s = this.calculateX(i) + b(this.lineWidth),
                  n =
                    this.calculateX(i - (this.offsetGridLines ? 0.5 : 0)) +
                    b(this.lineWidth),
                  a = this.xLabelRotation > 0,
                  o = this.showVerticalLines;
                0 !== i || o || (o = !0),
                  o && t.beginPath(),
                  i > 0
                    ? ((t.lineWidth = this.gridLineWidth),
                      (t.strokeStyle = this.gridLineColor))
                    : ((t.lineWidth = this.lineWidth),
                      (t.strokeStyle = this.lineColor)),
                  o &&
                    (t.moveTo(n, this.endPoint),
                    t.lineTo(n, this.startPoint - 3),
                    t.stroke(),
                    t.closePath()),
                  (t.lineWidth = this.lineWidth),
                  (t.strokeStyle = this.lineColor),
                  t.beginPath(),
                  t.moveTo(n, this.endPoint),
                  t.lineTo(n, this.endPoint + 5),
                  t.stroke(),
                  t.closePath(),
                  t.save(),
                  t.translate(s, a ? this.endPoint + 12 : this.endPoint + 8),
                  t.rotate(-1 * y(this.xLabelRotation)),
                  (t.font = this.font),
                  (t.textAlign = a ? "right" : "center"),
                  (t.textBaseline = a ? "middle" : "top"),
                  t.fillText(e, 0, 0),
                  t.restore();
              },
              this
            ));
        },
      })),
      (i.RadialScale = i.Element.extend({
        initialize: function () {
          (this.size = m([this.height, this.width])),
            (this.drawingArea = this.display
              ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY)
              : this.size / 2);
        },
        calculateCenterOffset: function (t) {
          var e = this.drawingArea / (this.max - this.min);
          return (t - this.min) * e;
        },
        update: function () {
          this.lineArc
            ? (this.drawingArea = this.display
                ? this.size / 2 - (this.fontSize / 2 + this.backdropPaddingY)
                : this.size / 2)
            : this.setScaleSize(),
            this.buildYLabels();
        },
        buildYLabels: function () {
          this.yLabels = [];
          for (var t = v(this.stepValue), e = 0; e <= this.steps; e++)
            this.yLabels.push(
              x(this.templateString, {
                value: (this.min + e * this.stepValue).toFixed(t),
              })
            );
        },
        getCircumference: function () {
          return (2 * Math.PI) / this.valuesCount;
        },
        setScaleSize: function () {
          var t,
            e,
            i,
            s,
            n,
            a,
            o,
            h,
            r,
            l,
            c,
            u,
            d = m([
              this.height / 2 - this.pointLabelFontSize - 5,
              this.width / 2,
            ]),
            p = this.width,
            f = 0;
          for (
            this.ctx.font = W(
              this.pointLabelFontSize,
              this.pointLabelFontStyle,
              this.pointLabelFontFamily
            ),
              e = 0;
            e < this.valuesCount;
            e++
          )
            (t = this.getPointPosition(e, d)),
              (i =
                this.ctx.measureText(
                  x(this.templateString, {
                    value: this.labels[e],
                  })
                ).width + 5),
              0 === e || e === this.valuesCount / 2
                ? ((s = i / 2),
                  t.x + s > p && ((p = t.x + s), (n = e)),
                  t.x - s < f && ((f = t.x - s), (o = e)))
                : e < this.valuesCount / 2
                ? t.x + i > p && ((p = t.x + i), (n = e))
                : e > this.valuesCount / 2 &&
                  t.x - i < f &&
                  ((f = t.x - i), (o = e));
          (r = f),
            (l = Math.ceil(p - this.width)),
            (a = this.getIndexAngle(n)),
            (h = this.getIndexAngle(o)),
            (c = l / Math.sin(a + Math.PI / 2)),
            (u = r / Math.sin(h + Math.PI / 2)),
            (c = g(c) ? c : 0),
            (u = g(u) ? u : 0),
            (this.drawingArea = d - (u + c) / 2),
            this.setCenterPoint(u, c);
        },
        setCenterPoint: function (t, e) {
          var i = this.width - e - this.drawingArea,
            s = t + this.drawingArea;
          (this.xCenter = (s + i) / 2), (this.yCenter = this.height / 2);
        },
        getIndexAngle: function (t) {
          var e = (2 * Math.PI) / this.valuesCount;
          return t * e - Math.PI / 2;
        },
        getPointPosition: function (t, e) {
          var i = this.getIndexAngle(t);
          return {
            x: Math.cos(i) * e + this.xCenter,
            y: Math.sin(i) * e + this.yCenter,
          };
        },
        draw: function () {
          if (this.display) {
            var t = this.ctx;
            if (
              (n(
                this.yLabels,
                function (e, i) {
                  if (i > 0) {
                    var s,
                      n = i * (this.drawingArea / this.steps),
                      a = this.yCenter - n;
                    if (this.lineWidth > 0)
                      if (
                        ((t.strokeStyle = this.lineColor),
                        (t.lineWidth = this.lineWidth),
                        this.lineArc)
                      )
                        t.beginPath(),
                          t.arc(this.xCenter, this.yCenter, n, 0, 2 * Math.PI),
                          t.closePath(),
                          t.stroke();
                      else {
                        t.beginPath();
                        for (var o = 0; o < this.valuesCount; o++)
                          (s = this.getPointPosition(
                            o,
                            this.calculateCenterOffset(
                              this.min + i * this.stepValue
                            )
                          )),
                            0 === o ? t.moveTo(s.x, s.y) : t.lineTo(s.x, s.y);
                        t.closePath(), t.stroke();
                      }
                    if (this.showLabels) {
                      if (
                        ((t.font = W(
                          this.fontSize,
                          this.fontStyle,
                          this.fontFamily
                        )),
                        this.showLabelBackdrop)
                      ) {
                        var h = t.measureText(e).width;
                        (t.fillStyle = this.backdropColor),
                          t.fillRect(
                            this.xCenter - h / 2 - this.backdropPaddingX,
                            a - this.fontSize / 2 - this.backdropPaddingY,
                            h + 2 * this.backdropPaddingX,
                            this.fontSize + 2 * this.backdropPaddingY
                          );
                      }
                      (t.textAlign = "center"),
                        (t.textBaseline = "middle"),
                        (t.fillStyle = this.fontColor),
                        t.fillText(e, this.xCenter, a);
                    }
                  }
                },
                this
              ),
              !this.lineArc)
            ) {
              (t.lineWidth = this.angleLineWidth),
                (t.strokeStyle = this.angleLineColor);
              for (var e = this.valuesCount - 1; e >= 0; e--) {
                if (this.angleLineWidth > 0) {
                  var i = this.getPointPosition(
                    e,
                    this.calculateCenterOffset(this.max)
                  );
                  t.beginPath(),
                    t.moveTo(this.xCenter, this.yCenter),
                    t.lineTo(i.x, i.y),
                    t.stroke(),
                    t.closePath();
                }
                var s = this.getPointPosition(
                  e,
                  this.calculateCenterOffset(this.max) + 5
                );
                (t.font = W(
                  this.pointLabelFontSize,
                  this.pointLabelFontStyle,
                  this.pointLabelFontFamily
                )),
                  (t.fillStyle = this.pointLabelFontColor);
                var a = this.labels.length,
                  o = this.labels.length / 2,
                  h = o / 2,
                  r = h > e || e > a - h,
                  l = e === h || e === a - h;
                0 === e
                  ? (t.textAlign = "center")
                  : e === o
                  ? (t.textAlign = "center")
                  : o > e
                  ? (t.textAlign = "left")
                  : (t.textAlign = "right"),
                  l
                    ? (t.textBaseline = "middle")
                    : r
                    ? (t.textBaseline = "bottom")
                    : (t.textBaseline = "top"),
                  t.fillText(this.labels[e], s.x, s.y);
              }
            }
          }
        },
      })),
      s.addEvent(
        window,
        "resize",
        (function () {
          var t;
          return function () {
            clearTimeout(t),
              (t = setTimeout(function () {
                n(i.instances, function (t) {
                  t.options.responsive && t.resize(t.render, !0);
                });
              }, 50));
          };
        })()
      ),
      p
        ? define(function () {
            return i;
          })
        : "object" == typeof module && module.exports && (module.exports = i),
      (t.Chart = i),
      (i.noConflict = function () {
        return (t.Chart = e), i;
      });
  }.call(this),
    function () {
      "use strict";
      var t = this,
        e = t.Chart,
        i = e.helpers,
        s = {
          scaleBeginAtZero: !0,
          scaleShowGridLines: !0,
          scaleGridLineColor: "rgba(0,0,0,.05)",
          scaleGridLineWidth: 1,
          scaleShowHorizontalLines: !0,
          scaleShowVerticalLines: !0,
          barShowStroke: !0,
          barStrokeWidth: 2,
          barValueSpacing: 5,
          barDatasetSpacing: 1,
          legendTemplate:
            '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
        };
      e.Type.extend({
        name: "Bar",
        defaults: s,
        initialize: function (t) {
          var s = this.options;
          (this.ScaleClass = e.Scale.extend({
            offsetGridLines: !0,
            calculateBarX: function (t, e, i) {
              var n = this.calculateBaseWidth(),
                a = this.calculateX(i) - n / 2,
                o = this.calculateBarWidth(t);
              return a + o * e + e * s.barDatasetSpacing + o / 2;
            },
            calculateBaseWidth: function () {
              return (
                this.calculateX(1) - this.calculateX(0) - 2 * s.barValueSpacing
              );
            },
            calculateBarWidth: function (t) {
              var e = this.calculateBaseWidth() - (t - 1) * s.barDatasetSpacing;
              return e / t;
            },
          })),
            (this.datasets = []),
            this.options.showTooltips &&
              i.bindEvents(this, this.options.tooltipEvents, function (t) {
                var e = "mouseout" !== t.type ? this.getBarsAtEvent(t) : [];
                this.eachBars(function (t) {
                  t.restore(["fillColor", "strokeColor"]);
                }),
                  i.each(e, function (t) {
                    (t.fillColor = t.highlightFill),
                      (t.strokeColor = t.highlightStroke);
                  }),
                  this.showTooltip(e);
              }),
            (this.BarClass = e.Rectangle.extend({
              strokeWidth: this.options.barStrokeWidth,
              showStroke: this.options.barShowStroke,
              ctx: this.chart.ctx,
            })),
            i.each(
              t.datasets,
              function (e, s) {
                var n = {
                  label: e.label || null,
                  fillColor: e.fillColor,
                  strokeColor: e.strokeColor,
                  bars: [],
                };
                this.datasets.push(n),
                  i.each(
                    e.data,
                    function (i, s) {
                      n.bars.push(
                        new this.BarClass({
                          value: i,
                          label: t.labels[s],
                          datasetLabel: e.label,
                          strokeColor: e.strokeColor,
                          fillColor: e.fillColor,
                          highlightFill: e.highlightFill || e.fillColor,
                          highlightStroke: e.highlightStroke || e.strokeColor,
                        })
                      );
                    },
                    this
                  );
              },
              this
            ),
            this.buildScale(t.labels),
            (this.BarClass.prototype.base = this.scale.endPoint),
            this.eachBars(function (t, e, s) {
              i.extend(t, {
                width: this.scale.calculateBarWidth(this.datasets.length),
                x: this.scale.calculateBarX(this.datasets.length, s, e),
                y: this.scale.endPoint,
              }),
                t.save();
            }, this),
            this.render();
        },
        update: function () {
          this.scale.update(),
            i.each(this.activeElements, function (t) {
              t.restore(["fillColor", "strokeColor"]);
            }),
            this.eachBars(function (t) {
              t.save();
            }),
            this.render();
        },
        eachBars: function (t) {
          i.each(
            this.datasets,
            function (e, s) {
              i.each(e.bars, t, this, s);
            },
            this
          );
        },
        getBarsAtEvent: function (t) {
          for (
            var e,
              s = [],
              n = i.getRelativePosition(t),
              a = function (t) {
                s.push(t.bars[e]);
              },
              o = 0;
            o < this.datasets.length;
            o++
          )
            for (e = 0; e < this.datasets[o].bars.length; e++)
              if (this.datasets[o].bars[e].inRange(n.x, n.y))
                return i.each(this.datasets, a), s;
          return s;
        },
        buildScale: function (t) {
          var e = this,
            s = function () {
              var t = [];
              return (
                e.eachBars(function (e) {
                  t.push(e.value);
                }),
                t
              );
            },
            n = {
              templateString: this.options.scaleLabel,
              height: this.chart.height,
              width: this.chart.width,
              ctx: this.chart.ctx,
              textColor: this.options.scaleFontColor,
              fontSize: this.options.scaleFontSize,
              fontStyle: this.options.scaleFontStyle,
              fontFamily: this.options.scaleFontFamily,
              valuesCount: t.length,
              beginAtZero: this.options.scaleBeginAtZero,
              integersOnly: this.options.scaleIntegersOnly,
              calculateYRange: function (t) {
                var e = i.calculateScaleRange(
                  s(),
                  t,
                  this.fontSize,
                  this.beginAtZero,
                  this.integersOnly
                );
                i.extend(this, e);
              },
              xLabels: t,
              font: i.fontString(
                this.options.scaleFontSize,
                this.options.scaleFontStyle,
                this.options.scaleFontFamily
              ),
              lineWidth: this.options.scaleLineWidth,
              lineColor: this.options.scaleLineColor,
              showHorizontalLines: this.options.scaleShowHorizontalLines,
              showVerticalLines: this.options.scaleShowVerticalLines,
              gridLineWidth: this.options.scaleShowGridLines
                ? this.options.scaleGridLineWidth
                : 0,
              gridLineColor: this.options.scaleShowGridLines
                ? this.options.scaleGridLineColor
                : "rgba(0,0,0,0)",
              padding: this.options.showScale
                ? 0
                : this.options.barShowStroke
                ? this.options.barStrokeWidth
                : 0,
              showLabels: this.options.scaleShowLabels,
              display: this.options.showScale,
            };
          this.options.scaleOverride &&
            i.extend(n, {
              calculateYRange: i.noop,
              steps: this.options.scaleSteps,
              stepValue: this.options.scaleStepWidth,
              min: this.options.scaleStartValue,
              max:
                this.options.scaleStartValue +
                this.options.scaleSteps * this.options.scaleStepWidth,
            }),
            (this.scale = new this.ScaleClass(n));
        },
        addData: function (t, e) {
          i.each(
            t,
            function (t, i) {
              this.datasets[i].bars.push(
                new this.BarClass({
                  value: t,
                  label: e,
                  x: this.scale.calculateBarX(
                    this.datasets.length,
                    i,
                    this.scale.valuesCount + 1
                  ),
                  y: this.scale.endPoint,
                  width: this.scale.calculateBarWidth(this.datasets.length),
                  base: this.scale.endPoint,
                  strokeColor: this.datasets[i].strokeColor,
                  fillColor: this.datasets[i].fillColor,
                })
              );
            },
            this
          ),
            this.scale.addXLabel(e),
            this.update();
        },
        removeData: function () {
          this.scale.removeXLabel(),
            i.each(
              this.datasets,
              function (t) {
                t.bars.shift();
              },
              this
            ),
            this.update();
        },
        reflow: function () {
          i.extend(this.BarClass.prototype, {
            y: this.scale.endPoint,
            base: this.scale.endPoint,
          });
          var t = i.extend({
            height: this.chart.height,
            width: this.chart.width,
          });
          this.scale.update(t);
        },
        draw: function (t) {
          var e = t || 1;
          this.clear(),
            this.chart.ctx,
            this.scale.draw(e),
            i.each(
              this.datasets,
              function (t, s) {
                i.each(
                  t.bars,
                  function (t, i) {
                    t.hasValue() &&
                      ((t.base = this.scale.endPoint),
                      t
                        .transition(
                          {
                            x: this.scale.calculateBarX(
                              this.datasets.length,
                              s,
                              i
                            ),
                            y: this.scale.calculateY(t.value),
                            width: this.scale.calculateBarWidth(
                              this.datasets.length
                            ),
                          },
                          e
                        )
                        .draw());
                  },
                  this
                );
              },
              this
            );
        },
      });
    }.call(this),
    function () {
      "use strict";
      var t = this,
        e = t.Chart,
        i = e.helpers,
        s = {
          segmentShowStroke: !0,
          segmentStrokeColor: "#fff",
          segmentStrokeWidth: 2,
          percentageInnerCutout: 50,
          animationSteps: 100,
          animationEasing: "easeOutBounce",
          animateRotate: !0,
          animateScale: !1,
          legendTemplate:
            '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        };
      e.Type.extend({
        name: "Doughnut",
        defaults: s,
        initialize: function (t) {
          (this.segments = []),
            (this.outerRadius =
              (i.min([this.chart.width, this.chart.height]) -
                this.options.segmentStrokeWidth / 2) /
              2),
            (this.SegmentArc = e.Arc.extend({
              ctx: this.chart.ctx,
              x: this.chart.width / 2,
              y: this.chart.height / 2,
            })),
            this.options.showTooltips &&
              i.bindEvents(this, this.options.tooltipEvents, function (t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                i.each(this.segments, function (t) {
                  t.restore(["fillColor"]);
                }),
                  i.each(e, function (t) {
                    t.fillColor = t.highlightColor;
                  }),
                  this.showTooltip(e);
              }),
            this.calculateTotal(t),
            i.each(
              t,
              function (t, e) {
                this.addData(t, e, !0);
              },
              this
            ),
            this.render();
        },
        getSegmentsAtEvent: function (t) {
          var e = [],
            s = i.getRelativePosition(t);
          return (
            i.each(
              this.segments,
              function (t) {
                t.inRange(s.x, s.y) && e.push(t);
              },
              this
            ),
            e
          );
        },
        addData: function (t, e, i) {
          var s = e || this.segments.length;
          this.segments.splice(
            s,
            0,
            new this.SegmentArc({
              value: t.value,
              outerRadius: this.options.animateScale ? 0 : this.outerRadius,
              innerRadius: this.options.animateScale
                ? 0
                : (this.outerRadius / 100) * this.options.percentageInnerCutout,
              fillColor: t.color,
              highlightColor: t.highlight || t.color,
              showStroke: this.options.segmentShowStroke,
              strokeWidth: this.options.segmentStrokeWidth,
              strokeColor: this.options.segmentStrokeColor,
              startAngle: 1.5 * Math.PI,
              circumference: this.options.animateRotate
                ? 0
                : this.calculateCircumference(t.value),
              label: t.label,
            })
          ),
            i || (this.reflow(), this.update());
        },
        calculateCircumference: function (t) {
          return 2 * Math.PI * (Math.abs(t) / this.total);
        },
        calculateTotal: function (t) {
          (this.total = 0),
            i.each(
              t,
              function (t) {
                this.total += Math.abs(t.value);
              },
              this
            );
        },
        update: function () {
          this.calculateTotal(this.segments),
            i.each(this.activeElements, function (t) {
              t.restore(["fillColor"]);
            }),
            i.each(this.segments, function (t) {
              t.save();
            }),
            this.render();
        },
        removeData: function (t) {
          var e = i.isNumber(t) ? t : this.segments.length - 1;
          this.segments.splice(e, 1), this.reflow(), this.update();
        },
        reflow: function () {
          i.extend(this.SegmentArc.prototype, {
            x: this.chart.width / 2,
            y: this.chart.height / 2,
          }),
            (this.outerRadius =
              (i.min([this.chart.width, this.chart.height]) -
                this.options.segmentStrokeWidth / 2) /
              2),
            i.each(
              this.segments,
              function (t) {
                t.update({
                  outerRadius: this.outerRadius,
                  innerRadius:
                    (this.outerRadius / 100) * this.options.percentageInnerCutout,
                });
              },
              this
            );
        },
        // draw: function(t) {
        //     var e = t ? t : 1;
        //     this.clear(), i.each(this.segments, function(t, i) {
        //         t.transition({
        //             circumference: this.calculateCircumference(t.value),
        //             outerRadius: this.outerRadius,
        //             innerRadius: this.outerRadius / 100 * this.options.percentageInnerCutout
        //         }, e), t.endAngle = t.startAngle + t.circumference, t.draw(), 0 === i && (t.startAngle = 1.5 * Math.PI), i < this.segments.length - 1 && (this.segments[i + 1].startAngle = t.endAngle)
        //     }, this)
        // }
      }),
        e.types.Doughnut.extend({
          name: "Pie",
          defaults: i.merge(s, {
            percentageInnerCutout: 0,
          }),
        });
    }.call(this),
    function () {
      "use strict";
      var t = this,
        e = t.Chart,
        i = e.helpers,
        s = {
          scaleShowGridLines: !0,
          scaleGridLineColor: "rgba(0,0,0,.05)",
          scaleGridLineWidth: 1,
          scaleShowHorizontalLines: !0,
          scaleShowVerticalLines: !0,
          bezierCurve: !0,
          bezierCurveTension: 0.4,
          pointDot: !0,
          pointDotRadius: 4,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: !0,
          datasetStrokeWidth: 2,
          datasetFill: !0,
          legendTemplate:
            '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
        };
      e.Type.extend({
        name: "Line",
        defaults: s,
        initialize: function (t) {
          (this.PointClass = e.Point.extend({
            strokeWidth: this.options.pointDotStrokeWidth,
            radius: this.options.pointDotRadius,
            display: this.options.pointDot,
            hitDetectionRadius: this.options.pointHitDetectionRadius,
            ctx: this.chart.ctx,
            inRange: function (t) {
              return (
                Math.pow(t - this.x, 2) <
                Math.pow(this.radius + this.hitDetectionRadius, 2)
              );
            },
          })),
            (this.datasets = []),
            this.options.showTooltips &&
              i.bindEvents(this, this.options.tooltipEvents, function (t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                this.eachPoints(function (t) {
                  t.restore(["fillColor", "strokeColor"]);
                }),
                  i.each(e, function (t) {
                    (t.fillColor = t.highlightFill),
                      (t.strokeColor = t.highlightStroke);
                  }),
                  this.showTooltip(e);
              }),
            i.each(
              t.datasets,
              function (e) {
                var s = {
                  label: e.label || null,
                  fillColor: e.fillColor,
                  strokeColor: e.strokeColor,
                  pointColor: e.pointColor,
                  pointStrokeColor: e.pointStrokeColor,
                  points: [],
                };
                this.datasets.push(s),
                  i.each(
                    e.data,
                    function (i, n) {
                      s.points.push(
                        new this.PointClass({
                          value: i,
                          label: t.labels[n],
                          datasetLabel: e.label,
                          strokeColor: e.pointStrokeColor,
                          fillColor: e.pointColor,
                          highlightFill: e.pointHighlightFill || e.pointColor,
                          highlightStroke:
                            e.pointHighlightStroke || e.pointStrokeColor,
                        })
                      );
                    },
                    this
                  ),
                  this.buildScale(t.labels),
                  this.eachPoints(function (t, e) {
                    i.extend(t, {
                      x: this.scale.calculateX(e),
                      y: this.scale.endPoint,
                    }),
                      t.save();
                  }, this);
              },
              this
            ),
            this.render();
        },
        update: function () {
          this.scale.update(),
            i.each(this.activeElements, function (t) {
              t.restore(["fillColor", "strokeColor"]);
            }),
            this.eachPoints(function (t) {
              t.save();
            }),
            this.render();
        },
        eachPoints: function (t) {
          i.each(
            this.datasets,
            function (e) {
              i.each(e.points, t, this);
            },
            this
          );
        },
        getPointsAtEvent: function (t) {
          var e = [],
            s = i.getRelativePosition(t);
          return (
            i.each(
              this.datasets,
              function (t) {
                i.each(t.points, function (t) {
                  t.inRange(s.x, s.y) && e.push(t);
                });
              },
              this
            ),
            e
          );
        },
        buildScale: function (t) {
          var s = this,
            n = function () {
              var t = [];
              return (
                s.eachPoints(function (e) {
                  t.push(e.value);
                }),
                t
              );
            },
            a = {
              templateString: this.options.scaleLabel,
              height: this.chart.height,
              width: this.chart.width,
              ctx: this.chart.ctx,
              textColor: this.options.scaleFontColor,
              fontSize: this.options.scaleFontSize,
              fontStyle: this.options.scaleFontStyle,
              fontFamily: this.options.scaleFontFamily,
              valuesCount: t.length,
              beginAtZero: this.options.scaleBeginAtZero,
              integersOnly: this.options.scaleIntegersOnly,
              calculateYRange: function (t) {
                var e = i.calculateScaleRange(
                  n(),
                  t,
                  this.fontSize,
                  this.beginAtZero,
                  this.integersOnly
                );
                i.extend(this, e);
              },
              xLabels: t,
              font: i.fontString(
                this.options.scaleFontSize,
                this.options.scaleFontStyle,
                this.options.scaleFontFamily
              ),
              lineWidth: this.options.scaleLineWidth,
              lineColor: this.options.scaleLineColor,
              showHorizontalLines: this.options.scaleShowHorizontalLines,
              showVerticalLines: this.options.scaleShowVerticalLines,
              gridLineWidth: this.options.scaleShowGridLines
                ? this.options.scaleGridLineWidth
                : 0,
              gridLineColor: this.options.scaleShowGridLines
                ? this.options.scaleGridLineColor
                : "rgba(0,0,0,0)",
              padding: this.options.showScale
                ? 0
                : this.options.pointDotRadius + this.options.pointDotStrokeWidth,
              showLabels: this.options.scaleShowLabels,
              display: this.options.showScale,
            };
          this.options.scaleOverride &&
            i.extend(a, {
              calculateYRange: i.noop,
              steps: this.options.scaleSteps,
              stepValue: this.options.scaleStepWidth,
              min: this.options.scaleStartValue,
              max:
                this.options.scaleStartValue +
                this.options.scaleSteps * this.options.scaleStepWidth,
            }),
            (this.scale = new e.Scale(a));
        },
        addData: function (t, e) {
          i.each(
            t,
            function (t, i) {
              this.datasets[i].points.push(
                new this.PointClass({
                  value: t,
                  label: e,
                  x: this.scale.calculateX(this.scale.valuesCount + 1),
                  y: this.scale.endPoint,
                  strokeColor: this.datasets[i].pointStrokeColor,
                  fillColor: this.datasets[i].pointColor,
                })
              );
            },
            this
          ),
            this.scale.addXLabel(e),
            this.update();
        },
        removeData: function () {
          this.scale.removeXLabel(),
            i.each(
              this.datasets,
              function (t) {
                t.points.shift();
              },
              this
            ),
            this.update();
        },
        reflow: function () {
          var t = i.extend({
            height: this.chart.height,
            width: this.chart.width,
          });
          this.scale.update(t);
        },
        draw: function (t) {
          var e = t || 1;
          this.clear();
          var s = this.chart.ctx,
            n = function (t) {
              return null !== t.value;
            },
            a = function (t, e, s) {
              return i.findNextWhere(e, n, s) || t;
            },
            o = function (t, e, s) {
              return i.findPreviousWhere(e, n, s) || t;
            };
          this.scale.draw(e),
            i.each(
              this.datasets,
              function (t) {
                var h = i.where(t.points, n);
                i.each(
                  t.points,
                  function (t, i) {
                    t.hasValue() &&
                      t.transition(
                        {
                          y: this.scale.calculateY(t.value),
                          x: this.scale.calculateX(i),
                        },
                        e
                      );
                  },
                  this
                ),
                  this.options.bezierCurve &&
                    i.each(
                      h,
                      function (t, e) {
                        var s =
                          e > 0 && e < h.length - 1
                            ? this.options.bezierCurveTension
                            : 0;
                        (t.controlPoints = i.splineCurve(
                          o(t, h, e),
                          t,
                          a(t, h, e),
                          s
                        )),
                          t.controlPoints.outer.y > this.scale.endPoint
                            ? (t.controlPoints.outer.y = this.scale.endPoint)
                            : t.controlPoints.outer.y < this.scale.startPoint &&
                              (t.controlPoints.outer.y = this.scale.startPoint),
                          t.controlPoints.inner.y > this.scale.endPoint
                            ? (t.controlPoints.inner.y = this.scale.endPoint)
                            : t.controlPoints.inner.y < this.scale.startPoint &&
                              (t.controlPoints.inner.y = this.scale.startPoint);
                      },
                      this
                    ),
                  (s.lineWidth = this.options.datasetStrokeWidth),
                  (s.strokeStyle = t.strokeColor),
                  s.beginPath(),
                  i.each(
                    h,
                    function (t, e) {
                      if (0 === e) s.moveTo(t.x, t.y);
                      else if (this.options.bezierCurve) {
                        var i = o(t, h, e);
                        s.bezierCurveTo(
                          i.controlPoints.outer.x,
                          i.controlPoints.outer.y,
                          t.controlPoints.inner.x,
                          t.controlPoints.inner.y,
                          t.x,
                          t.y
                        );
                      } else s.lineTo(t.x, t.y);
                    },
                    this
                  ),
                  s.stroke(),
                  this.options.datasetFill &&
                    h.length > 0 &&
                    (s.lineTo(h[h.length - 1].x, this.scale.endPoint),
                    s.lineTo(h[0].x, this.scale.endPoint),
                    (s.fillStyle = t.fillColor),
                    s.closePath(),
                    s.fill()),
                  i.each(h, function (t) {
                    t.draw();
                  });
              },
              this
            );
        },
      });
    }.call(this),
    function () {
      "use strict";
      var t = this,
        e = t.Chart,
        i = e.helpers,
        s = {
          scaleShowLabelBackdrop: !0,
          scaleBackdropColor: "rgba(255,255,255,0.75)",
          scaleBeginAtZero: !0,
          scaleBackdropPaddingY: 2,
          scaleBackdropPaddingX: 2,
          scaleShowLine: !0,
          segmentShowStroke: !0,
          segmentStrokeColor: "#fff",
          segmentStrokeWidth: 2,
          animationSteps: 100,
          animationEasing: "easeOutBounce",
          animateRotate: !0,
          animateScale: !1,
          legendTemplate:
            '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>',
        };
      e.Type.extend({
        name: "PolarArea",
        defaults: s,
        initialize: function (t) {
          (this.segments = []),
            (this.SegmentArc = e.Arc.extend({
              showStroke: this.options.segmentShowStroke,
              strokeWidth: this.options.segmentStrokeWidth,
              strokeColor: this.options.segmentStrokeColor,
              ctx: this.chart.ctx,
              innerRadius: 0,
              x: this.chart.width / 2,
              y: this.chart.height / 2,
            })),
            (this.scale = new e.RadialScale({
              display: this.options.showScale,
              fontStyle: this.options.scaleFontStyle,
              fontSize: this.options.scaleFontSize,
              fontFamily: this.options.scaleFontFamily,
              fontColor: this.options.scaleFontColor,
              showLabels: this.options.scaleShowLabels,
              showLabelBackdrop: this.options.scaleShowLabelBackdrop,
              backdropColor: this.options.scaleBackdropColor,
              backdropPaddingY: this.options.scaleBackdropPaddingY,
              backdropPaddingX: this.options.scaleBackdropPaddingX,
              lineWidth: this.options.scaleShowLine
                ? this.options.scaleLineWidth
                : 0,
              lineColor: this.options.scaleLineColor,
              lineArc: !0,
              width: this.chart.width,
              height: this.chart.height,
              xCenter: this.chart.width / 2,
              yCenter: this.chart.height / 2,
              ctx: this.chart.ctx,
              templateString: this.options.scaleLabel,
              valuesCount: t.length,
            })),
            this.updateScaleRange(t),
            this.scale.update(),
            i.each(
              t,
              function (t, e) {
                this.addData(t, e, !0);
              },
              this
            ),
            this.options.showTooltips &&
              i.bindEvents(this, this.options.tooltipEvents, function (t) {
                var e = "mouseout" !== t.type ? this.getSegmentsAtEvent(t) : [];
                i.each(this.segments, function (t) {
                  t.restore(["fillColor"]);
                }),
                  i.each(e, function (t) {
                    t.fillColor = t.highlightColor;
                  }),
                  this.showTooltip(e);
              }),
            this.render();
        },
        getSegmentsAtEvent: function (t) {
          var e = [],
            s = i.getRelativePosition(t);
          return (
            i.each(
              this.segments,
              function (t) {
                t.inRange(s.x, s.y) && e.push(t);
              },
              this
            ),
            e
          );
        },
        addData: function (t, e, i) {
          var s = e || this.segments.length;
          this.segments.splice(
            s,
            0,
            new this.SegmentArc({
              fillColor: t.color,
              highlightColor: t.highlight || t.color,
              label: t.label,
              value: t.value,
              outerRadius: this.options.animateScale
                ? 0
                : this.scale.calculateCenterOffset(t.value),
              circumference: this.options.animateRotate
                ? 0
                : this.scale.getCircumference(),
              startAngle: 1.5 * Math.PI,
            })
          ),
            i || (this.reflow(), this.update());
        },
        removeData: function (t) {
          var e = i.isNumber(t) ? t : this.segments.length - 1;
          this.segments.splice(e, 1), this.reflow(), this.update();
        },
        calculateTotal: function (t) {
          (this.total = 0),
            i.each(
              t,
              function (t) {
                this.total += t.value;
              },
              this
            ),
            (this.scale.valuesCount = this.segments.length);
        },
        updateScaleRange: function (t) {
          var e = [];
          i.each(t, function (t) {
            e.push(t.value);
          });
          var s = this.options.scaleOverride
            ? {
                steps: this.options.scaleSteps,
                stepValue: this.options.scaleStepWidth,
                min: this.options.scaleStartValue,
                max:
                  this.options.scaleStartValue +
                  this.options.scaleSteps * this.options.scaleStepWidth,
              }
            : i.calculateScaleRange(
                e,
                i.min([this.chart.width, this.chart.height]) / 2,
                this.options.scaleFontSize,
                this.options.scaleBeginAtZero,
                this.options.scaleIntegersOnly
              );
          i.extend(this.scale, s, {
            size: i.min([this.chart.width, this.chart.height]),
            xCenter: this.chart.width / 2,
            yCenter: this.chart.height / 2,
          });
        },
        update: function () {
          this.calculateTotal(this.segments),
            i.each(this.segments, function (t) {
              t.save();
            }),
            this.reflow(),
            this.render();
        },
        reflow: function () {
          i.extend(this.SegmentArc.prototype, {
            x: this.chart.width / 2,
            y: this.chart.height / 2,
          }),
            this.updateScaleRange(this.segments),
            this.scale.update(),
            i.extend(this.scale, {
              xCenter: this.chart.width / 2,
              yCenter: this.chart.height / 2,
            }),
            i.each(
              this.segments,
              function (t) {
                t.update({
                  outerRadius: this.scale.calculateCenterOffset(t.value),
                });
              },
              this
            );
        },
        draw: function (t) {
          var e = t || 1;
          this.clear(),
            i.each(
              this.segments,
              function (t, i) {
                t.transition(
                  {
                    circumference: this.scale.getCircumference(),
                    outerRadius: this.scale.calculateCenterOffset(t.value),
                  },
                  e
                ),
                  (t.endAngle = t.startAngle + t.circumference),
                  0 === i && (t.startAngle = 1.5 * Math.PI),
                  i < this.segments.length - 1 &&
                    (this.segments[i + 1].startAngle = t.endAngle),
                  t.draw();
              },
              this
            ),
            this.scale.draw();
        },
      });
    }.call(this),
    function () {
      "use strict";
      var t = this,
        e = t.Chart,
        i = e.helpers;
      e.Type.extend({
        name: "Radar",
        defaults: {
          scaleShowLine: !0,
          angleShowLineOut: !0,
          scaleShowLabels: !1,
          scaleBeginAtZero: !0,
          angleLineColor: "rgba(0,0,0,.1)",
          angleLineWidth: 1,
          pointLabelFontFamily: "'Arial'",
          pointLabelFontStyle: "normal",
          pointLabelFontSize: 10,
          pointLabelFontColor: "#666",
          pointDot: !0,
          pointDotRadius: 3,
          pointDotStrokeWidth: 1,
          pointHitDetectionRadius: 20,
          datasetStroke: !0,
          datasetStrokeWidth: 2,
          datasetFill: !0,
          legendTemplate:
            '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
        },
        initialize: function (t) {
          (this.PointClass = e.Point.extend({
            strokeWidth: this.options.pointDotStrokeWidth,
            radius: this.options.pointDotRadius,
            display: this.options.pointDot,
            hitDetectionRadius: this.options.pointHitDetectionRadius,
            ctx: this.chart.ctx,
          })),
            (this.datasets = []),
            this.buildScale(t),
            this.options.showTooltips &&
              i.bindEvents(this, this.options.tooltipEvents, function (t) {
                var e = "mouseout" !== t.type ? this.getPointsAtEvent(t) : [];
                this.eachPoints(function (t) {
                  t.restore(["fillColor", "strokeColor"]);
                }),
                  i.each(e, function (t) {
                    (t.fillColor = t.highlightFill),
                      (t.strokeColor = t.highlightStroke);
                  }),
                  this.showTooltip(e);
              }),
            i.each(
              t.datasets,
              function (e) {
                var s = {
                  label: e.label || null,
                  fillColor: e.fillColor,
                  strokeColor: e.strokeColor,
                  pointColor: e.pointColor,
                  pointStrokeColor: e.pointStrokeColor,
                  points: [],
                };
                this.datasets.push(s),
                  i.each(
                    e.data,
                    function (i, n) {
                      var a;
                      this.scale.animation ||
                        (a = this.scale.getPointPosition(
                          n,
                          this.scale.calculateCenterOffset(i)
                        )),
                        s.points.push(
                          new this.PointClass({
                            value: i,
                            label: t.labels[n],
                            datasetLabel: e.label,
                            x: this.options.animation ? this.scale.xCenter : a.x,
                            y: this.options.animation ? this.scale.yCenter : a.y,
                            strokeColor: e.pointStrokeColor,
                            fillColor: e.pointColor,
                            highlightFill: e.pointHighlightFill || e.pointColor,
                            highlightStroke:
                              e.pointHighlightStroke || e.pointStrokeColor,
                          })
                        );
                    },
                    this
                  );
              },
              this
            ),
            this.render();
        },
        eachPoints: function (t) {
          i.each(
            this.datasets,
            function (e) {
              i.each(e.points, t, this);
            },
            this
          );
        },
        getPointsAtEvent: function (t) {
          var e = i.getRelativePosition(t),
            s = i.getAngleFromPoint(
              {
                x: this.scale.xCenter,
                y: this.scale.yCenter,
              },
              e
            ),
            n = (2 * Math.PI) / this.scale.valuesCount,
            a = Math.round((s.angle - 1.5 * Math.PI) / n),
            o = [];
          return (
            (a >= this.scale.valuesCount || 0 > a) && (a = 0),
            s.distance <= this.scale.drawingArea &&
              i.each(this.datasets, function (t) {
                o.push(t.points[a]);
              }),
            o
          );
        },
        buildScale: function (t) {
          (this.scale = new e.RadialScale({
            display: this.options.showScale,
            fontStyle: this.options.scaleFontStyle,
            fontSize: this.options.scaleFontSize,
            fontFamily: this.options.scaleFontFamily,
            fontColor: this.options.scaleFontColor,
            showLabels: this.options.scaleShowLabels,
            showLabelBackdrop: this.options.scaleShowLabelBackdrop,
            backdropColor: this.options.scaleBackdropColor,
            backdropPaddingY: this.options.scaleBackdropPaddingY,
            backdropPaddingX: this.options.scaleBackdropPaddingX,
            lineWidth: this.options.scaleShowLine
              ? this.options.scaleLineWidth
              : 0,
            lineColor: this.options.scaleLineColor,
            angleLineColor: this.options.angleLineColor,
            angleLineWidth: this.options.angleShowLineOut
              ? this.options.angleLineWidth
              : 0,
            pointLabelFontColor: this.options.pointLabelFontColor,
            pointLabelFontSize: this.options.pointLabelFontSize,
            pointLabelFontFamily: this.options.pointLabelFontFamily,
            pointLabelFontStyle: this.options.pointLabelFontStyle,
            height: this.chart.height,
            width: this.chart.width,
            xCenter: this.chart.width / 2,
            yCenter: this.chart.height / 2,
            ctx: this.chart.ctx,
            templateString: this.options.scaleLabel,
            labels: t.labels,
            valuesCount: t.datasets[0].data.length,
          })),
            this.scale.setScaleSize(),
            this.updateScaleRange(t.datasets),
            this.scale.buildYLabels();
        },
        updateScaleRange: function (t) {
          var e = (function () {
              var e = [];
              return (
                i.each(t, function (t) {
                  t.data
                    ? (e = e.concat(t.data))
                    : i.each(t.points, function (t) {
                        e.push(t.value);
                      });
                }),
                e
              );
            })(),
            s = this.options.scaleOverride
              ? {
                  steps: this.options.scaleSteps,
                  stepValue: this.options.scaleStepWidth,
                  min: this.options.scaleStartValue,
                  max:
                    this.options.scaleStartValue +
                    this.options.scaleSteps * this.options.scaleStepWidth,
                }
              : i.calculateScaleRange(
                  e,
                  i.min([this.chart.width, this.chart.height]) / 2,
                  this.options.scaleFontSize,
                  this.options.scaleBeginAtZero,
                  this.options.scaleIntegersOnly
                );
          i.extend(this.scale, s);
        },
        addData: function (t, e) {
          this.scale.valuesCount++,
            i.each(
              t,
              function (t, i) {
                var s = this.scale.getPointPosition(
                  this.scale.valuesCount,
                  this.scale.calculateCenterOffset(t)
                );
                this.datasets[i].points.push(
                  new this.PointClass({
                    value: t,
                    label: e,
                    x: s.x,
                    y: s.y,
                    strokeColor: this.datasets[i].pointStrokeColor,
                    fillColor: this.datasets[i].pointColor,
                  })
                );
              },
              this
            ),
            this.scale.labels.push(e),
            this.reflow(),
            this.update();
        },
        removeData: function () {
          this.scale.valuesCount--,
            this.scale.labels.shift(),
            i.each(
              this.datasets,
              function (t) {
                t.points.shift();
              },
              this
            ),
            this.reflow(),
            this.update();
        },
        update: function () {
          this.eachPoints(function (t) {
            t.save();
          }),
            this.reflow(),
            this.render();
        },
        reflow: function () {
          i.extend(this.scale, {
            width: this.chart.width,
            height: this.chart.height,
            size: i.min([this.chart.width, this.chart.height]),
            xCenter: this.chart.width / 2,
            yCenter: this.chart.height / 2,
          }),
            this.updateScaleRange(this.datasets),
            this.scale.setScaleSize(),
            this.scale.buildYLabels();
        },
        draw: function (t) {
          var e = t || 1,
            s = this.chart.ctx;
          this.clear(),
            this.scale.draw(),
            i.each(
              this.datasets,
              function (t) {
                i.each(
                  t.points,
                  function (t, i) {
                    t.hasValue() &&
                      t.transition(
                        this.scale.getPointPosition(
                          i,
                          this.scale.calculateCenterOffset(t.value)
                        ),
                        e
                      );
                  },
                  this
                ),
                  (s.lineWidth = this.options.datasetStrokeWidth),
                  (s.strokeStyle = t.strokeColor),
                  s.beginPath(),
                  i.each(
                    t.points,
                    function (t, e) {
                      0 === e ? s.moveTo(t.x, t.y) : s.lineTo(t.x, t.y);
                    },
                    this
                  ),
                  s.closePath(),
                  s.stroke(),
                  (s.fillStyle = t.fillColor),
                  s.fill(),
                  i.each(t.points, function (t) {
                    t.hasValue() && t.draw();
                  });
              },
              this
            );
        },
      });
    }.call(this));
  var GenderEnum = {
      FEMALE: 0,
      MALE: 1,
      properties: {
        0: {
          name: "Female",
          value: 0,
        },
        1: {
          name: "Male",
          value: 1,
        },
      },
    },
    WarningsEnum = {
      BODYFATTOOLOW: 1,
      FATGRAMSTOOLOW: 2,
      CARBSTOOHIGH: 8,
      CALORIESTOOLOW: 16,
    },
    kdBuddy;
  jQuery("select").change(function (t) {
    reloadUI(), adjust_canvas_for_lower_width();
  }),
    jQuery("input:text").on("input", function (t) {
      reloadUI(), adjust_canvas_for_lower_width();
    }),
    jQuery(document).ready(function () {
      trySetCheckedFromCookie("input[name=units_switcher]"),
        trySetCheckedFromCookie("input[name=gender_switcher]"),
        trySetCheckedFromCookie("input[name=activity_radio]:checked"),
        trySetCheckedFromCookie("input[name=goal_radio]:checked"),
        trySetTextFromCookie("input[name=age]"),
        trySetTextFromCookie("input[name=weightMetricKilos]"),
        trySetTextFromCookie("input[name=weightUSPounds]"),
        trySetTextFromCookie("input[name=weightImperialStones]"),
        trySetTextFromCookie("input[name=weightImperialPounds]"),
        trySetTextFromCookie("input[name=heightMetricMeters]"),
        trySetTextFromCookie("input[name=heightUSFeet]"),
        trySetTextFromCookie("input[name=heightUSInches]"),
        trySetTextFromCookie("input[name=heightImperialFeet]"),
        trySetTextFromCookie("input[name=heightImperialInches]"),
        trySetTextFromCookie("input[name=bodyfat]"),
        trySetTextFromCookie("input[name=netcarbs]"),
        reloadUI(),
        adjust_canvas_for_lower_width();
    });
  
  function openTab(indextab) {
    // Get all elements with class="tabcontent" and hide them
    jQuery(".keto_tabcontent").each(function () {
      jQuery(this).hide();
    });
  
    // Get all elements with class="tablinks" and remove the class "active"
    jQuery(".keto_tab .tablinks").each(function (index) {
      jQuery(this).removeClass("active");
  
      if (index === indextab) {
        jQuery(this).addClass("active");
        jQuery(".keto_tabcontent:nth-child(" + parseInt(index + 1) + ")").show();
      }
    });
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    jQuery(".keto_tab").removeClass(
      "keto_tab_1 keto_tab_2 keto_tab_3 keto_tab_4"
    );
    jQuery(".keto_tab").addClass("keto_tab_" + parseInt(indextab + 1));
  }
  
  jQuery(document).ready(function ($) {
    jQuery("input[name=units_switcher]").on("click", function () {
      reloadUI();
      adjust_canvas_for_lower_width();
    });
  
    jQuery("input[name=gender_switcher]").on("click", function () {
      reloadUI();
      adjust_canvas_for_lower_width();
    });
  
    jQuery("input[name=activity_radio]").on("click", function () {
      reloadUI();
      adjust_canvas_for_lower_width();
    });
  
    jQuery("input[name=goal_radio]").on("click", function () {
      reloadUI();
      adjust_canvas_for_lower_width();
    });
  
    jQuery(".keto_tab .tablinks:nth-child(1)").on("click", function () {
      openTab(0);
    });
  
    jQuery(".keto_tab .tablinks:nth-child(2)").on("click", function () {
      openTab(1);
    });
  
    jQuery(".keto_tab .tablinks:nth-child(3)").on("click", function () {
      openTab(2);
    });
  
    jQuery(".keto_tab .tablinks:nth-child(4)").on("click", function () {
      openTab(3);
    });
  
    jQuery("#keto_about_you .keto_button_next").on("click", function () {
      openTab(1);
    });
  
    jQuery("#keto_activity_level .keto_button_prev").on("click", function () {
      openTab(0);
    });
  
    jQuery("#keto_activity_level .keto_button_next").on("click", function () {
      openTab(2);
    });
  
    jQuery("#keto_goal .keto_button_prev").on("click", function () {
      openTab(1);
    });
  
    jQuery("#keto_goal .keto_button_next").on("click", function () {
      openTab(3);
    });
  
    jQuery("#keto_result .keto_button_prev").on("click", function () {
      openTab(2);
    });
  });
  