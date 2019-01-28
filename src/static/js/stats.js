// Hive Three Extensions
// Copyright (c) 2008-2019 Hive Solutions Lda.
//
// This file is part of Hive Three Extensions.
//
// Hive Three Extensions is free software: you can redistribute it and/or modify
// it under the terms of the Apache License as published by the Apache
// Foundation, either version 2.0 of the License, or (at your option) any
// later version.
//
// Hive Three Extensions is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// Apache License for more details.
//
// You should have received a copy of the Apache License along with
// Hive Three Extensions. If not, see <http://www.apache.org/licenses/>.

// __author__    = João Magalhães <joamag@hive.pt>
// __version__   = 1.0.0
// __revision__  = $LastChangedRevision$
// __date__      = $LastChangedDate$
// __copyright__ = Copyright (c) 2008-2019 Hive Solutions Lda.
// __license__   = Apache License, Version 2.0
// __credits__   = Ricardo Miguel <mrdoob@gmail.com>

var THREEx = THREEx || {};

THREEx.Stats = function() {
    var startTime = Date.now(),
        prevTime = startTime;
    var ms = 0,
        msMin = Infinity,
        msMax = 0;
    var fps = 0,
        fpsMin = Infinity,
        fpsMax = 0;
    var frames = 0,
        mode = 0;

    var container = document.createElement("div");
    container.id = "stats";
    container.addEventListener("mousedown", function(event) {
        event.preventDefault();
        setMode(++mode % 2)
    }, false);
    container.style.cssText = "width:80px;opacity:0.9;cursor:pointer";

    var fpsDiv = document.createElement("div");
    fpsDiv.id = "fps";
    fpsDiv.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";
    container.appendChild(fpsDiv);

    var fpsText = document.createElement("div");
    fpsText.id = "fpsText";
    fpsText.style.cssText =
        "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    fpsText.innerHTML = "FPS";
    fpsDiv.appendChild(fpsText);

    var fpsGraph = document.createElement("div");
    fpsGraph.id = "fpsGraph";
    fpsGraph.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";
    fpsDiv.appendChild(fpsGraph);

    while (fpsGraph.children.length < 74) {
        var bar = document.createElement("span");
        bar.style.cssText = "width:1px;height:30px;float:left;background-color:#113";
        fpsGraph.appendChild(bar);
    }

    var msDiv = document.createElement("div");
    msDiv.id = "ms";
    msDiv.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
    container.appendChild(msDiv);

    var msText = document.createElement("div");
    msText.id = "msText";
    msText.style.cssText =
        "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
    msText.innerHTML = "MS";
    msDiv.appendChild(msText);

    var msGraph = document.createElement("div");
    msGraph.id = "msGraph";
    msGraph.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0";
    msDiv.appendChild(msGraph);

    while (msGraph.children.length < 74) {
        var bar = document.createElement("span");
        bar.style.cssText = "width:1px;height:30px;float:left;background-color:#131";
        msGraph.appendChild(bar);
    };

    var setMode = function(value) {
        mode = value;

        switch (mode) {
            case 0:
                fpsDiv.style.display = "block";
                msDiv.style.display = "none";
                break;

            case 1:
                fpsDiv.style.display = "none";
                msDiv.style.display = "block";
                break;
        }
    };

    var updateGraph = function(dom, value) {
        var child = dom.appendChild(dom.firstChild);
        child.style.height = value + "px";
    };

    return {
        REVISION: 11,
        domElement: container,
        setMode: setMode,

        begin: function() {
            startTime = Date.now();
        },

        end: function() {
            var time = Date.now();

            ms = time - startTime;
            msMin = Math.min(msMin, ms);
            msMax = Math.max(msMax, ms);

            msText.textContent = ms + " MS (" + msMin + "-" + msMax + ")";
            updateGraph(msGraph, Math.min(30, 30 - (ms / 200) * 30));

            frames++;

            if (time > prevTime + 1000) {
                fps = Math.round((frames * 1000) / (time - prevTime));
                fpsMin = Math.min(fpsMin, fps);
                fpsMax = Math.max(fpsMax, fps);

                fpsText.textContent = fps + " FPS (" + fpsMin + "-" + fpsMax + ")";
                updateGraph(fpsGraph, Math.min(30, 30 - (fps / 100) * 30));

                prevTime = time;
                frames = 0;

            }

            return time;
        },

        update: function() {
            startTime = this.end();
        }
    }
};
