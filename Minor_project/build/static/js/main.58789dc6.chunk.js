(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{11:function(e,t,n){e.exports=n(19)},16:function(e,t,n){},17:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(8),i=n.n(a),r=n(0),s=n.n(r),l=n(6),o=n(1),c=n(2),d=n(4),u=n(3),m=(n(16),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(o.a)(this,n),t.apply(this,arguments)}return Object(c.a)(n,[{key:"render",value:function(){var e=this.props,t=e.col,n=e.isFinish,a=e.isStart,i=e.isWall,r=e.onMouseDown,l=e.onMouseEnter,o=e.onMouseUp,c=e.row,d=n?"node-finish":a?"node-start":i?"node-wall":"";return s.a.createElement("div",{id:"node-".concat(c,"-").concat(t),className:"node ".concat(d),onMouseDown:function(){return r(c,t)},onMouseEnter:function(){return l(c,t)},onMouseUp:function(){return o()}})}}]),n}(r.Component)),h=(n(17),n(5));function f(e){for(var t=[],n=0;n<e.length;n++)for(var a=0;a<e[n].length;a++)t.push(e[n][a]);return t}function g(e,t){var n=[],a=e.col,i=e.row;return i>0&&n.push(t[i-1][a]),i<t.length-1&&n.push(t[i+1][a]),a>0&&n.push(t[i][a-1]),a<t[0].length-1&&n.push(t[i][a+1]),n.filter((function(e){return!e.isWall}))}function v(e,t){var n,a=function(e,t){var n=[],a=e.col,i=e.row;return i>0&&n.push(t[i-1][a]),i<t.length-1&&n.push(t[i+1][a]),a>0&&n.push(t[i][a-1]),a<t[0].length-1&&n.push(t[i][a+1]),n.filter((function(e){return!e.isVisited}))}(e,t),i=Object(h.a)(a);try{for(i.s();!(n=i.n()).done;){var r=n.value;r.distance=e.distance+1,r.previousNode=e}}catch(s){i.e(s)}finally{i.f()}}function p(e){for(var t=[],n=e;null!==n;)t.unshift(n),n=n.previousNode;return t}function E(e){e.sort((function(e,t){return e.distance-t.distance}))}function y(e,t){e.heruistic=function(e,t){return Math.abs(t.col-e.col)+Math.abs(t.row-e.row)}(e,t),e.cost=e.distance+e.heruistic}function b(e){return Math.floor(Math.random()*e)}function w(e,t){var n=e.length,a=e[0].length,i=t.row,r=t.col,s=[];return i+1>=0&&i+1<n&&r>=0&&r<a&&!e[i+1][r].isVisited&&!e[i+1][r].isWall&&s.push(e[i+1][r]),i-1>=0&&i-1<n&&r>=0&&r<a&&!e[i-1][r].isWall&&!e[i-1][r].isVisited&&s.push(e[i-1][r]),i>=0&&i<n&&r-1>=0&&r-1<a&&!e[i][r-1].isWall&&!e[i][r-1].isVisited&&s.push(e[i][r-1]),i>=0&&i<n&&r+1>=0&&r+1<a&&!e[i][r+1].isWall&&!e[i][r+1].isVisited&&s.push(e[i][r+1]),s}function k(e,t){var n=e.length,a=e[0].length,i=t.row,r=t.col,s=[];return i-1>=0&&i-1<n&&r>=0&&r<a&&!e[i-1][r].isWall&&!e[i-1][r].isVisited&&s.unshift(e[i-1][r]),i>=0&&i<n&&r+1>=0&&r+1<a&&!e[i][r+1].isWall&&!e[i][r+1].isVisited&&s.unshift(e[i][r+1]),i+1>=0&&i+1<n&&r>=0&&r<a&&!e[i+1][r].isVisited&&!e[i+1][r].isWall&&s.unshift(e[i+1][r]),i>=0&&i<n&&r-1>=0&&r-1<a&&!e[i][r-1].isWall&&!e[i][r-1].isVisited&&s.unshift(e[i][r-1]),s}var N=n(10),M=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;return Object(o.a)(this,n),(e=t.call(this)).state={grid:[],mouseIsPressed:!1,currentAlgorithm:[],performance:[],numberOfAlgos:0,disabledStart:!0},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=B();f(e),this.setState({grid:e})}},{key:"handleMouseDown",value:function(e,t){var n=L(this.state.grid,e,t);this.setState({grid:n,mouseIsPressed:!0})}},{key:"handleMouseEnter",value:function(e,t){if(this.state.mouseIsPressed){var n=L(this.state.grid,e,t);this.setState({grid:n})}}},{key:"handleMouseUp",value:function(){this.setState({mouseIsPressed:!1})}},{key:"clearGrid",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++)e[t][n].isVisited=!1,e[t][n].isStart||e[t][n].isFinish||e[t][n].isWall||(document.getElementById("node-".concat(e[t][n].row,"-").concat(e[t][n].col)).className="node ")}},{key:"clearWalls",value:function(){for(var e=this.state.grid,t=0;t<e.length;t++)for(var n=0;n<e[t].length;n++)e[t][n].isVisited=!1,e[t][n].isWall=!1,e[t][n].isStart||e[t][n].isFinish||(document.getElementById("node-".concat(e[t][n].row,"-").concat(e[t][n].col)).className="node ")}},{key:"recordPerofrmence",value:function(e,t,n,a){var i=this.state.performance,r=new Object;r.algorithm=e,r.time=t,r.shortestPathLength=a,r.numberOfVisitedNodes=n,i.push(r)}},{key:"displayPerformance",value:function(){var e=this.state.performance,t=this.state.numberOfAlgos,n=document.getElementById("algorithm"),a=document.getElementById("time"),i=document.getElementById("distance"),r=document.getElementById("visitedNodes");n.innerHTML="algorithm",a.innerHTML="time",i.innerHTML="Shortest Path Length",r.innerHTML="Number Of Visited Nodes";for(var s=[],l=[],o=[],c=[],d=0;d<t;d++)s[d]=document.getElementById("name"+d),l[d]=document.getElementById("time"+d),o[d]=document.getElementById("distance"+d),c[d]=document.getElementById("visitedNodes"+d),s[d].innerHTML=e[d].algorithm,l[d].innerHTML=e[d].time.toString()+" ms",o[d].innerHTML=e[d].shortestPathLength.toString(),c[d].innerHTML=e[d].numberOfVisitedNodes.toString();this.showComparison(),1==t&&(document.getElementById("table").style.marginLeft="500px",document.getElementById("timeList").style.display="none",document.getElementById("spaceList").style.display="none"),t>1&&(document.getElementById("table").style.marginLeft="120px",document.getElementById("timeList").style.display="block",document.getElementById("spaceList").style.display="block",this.showComparison()),4==t&&this.setState({numberOfAlgos:0})}},{key:"showComparison",value:function(){var e=this.state.performance,t=this.state.numberOfAlgos,n=e;n.sort((function(e,t){return e.time>t.time?1:-1})),document.getElementById("timelist").innerHTML="Algorithms ordered based on time";for(var a=0;a<t;a++)document.getElementById("timerow"+a).innerHTML=n[a].algorithm;n.sort((function(e,t){return e.numberOfVisitedNodes>t.numberOfVisitedNodes?1:-1})),document.getElementById("spacelist").innerHTML="Algorithms ordered based on space";for(var i=0;i<t;i++)document.getElementById("spacerow"+i).innerHTML=n[i].algorithm}},{key:"animateAlgorithm",value:function(e,t){var n=this,a=this.state.grid;e.includes(a[10][35])||(alert("No path avilable. Please try again"),window.location.reload());for(var i=function(a){if(a===e.length)return setTimeout((function(){n.animateShortestPath(t)}),20*a),{v:void 0};setTimeout((function(){var t=e[a];e[a].isStart||e[a].isFinish||(document.getElementById("node-".concat(t.row,"-").concat(t.col)).className="node node-visited")}),20*a)},r=0;r<=e.length;r++){var s=i(r);if("object"===typeof s)return s.v}}},{key:"animateShortestPath",value:function(e){for(var t=this,n=0,a=function(t){setTimeout((function(){var n=e[t];e[t].isStart||e[t].isFinish||(document.getElementById("node-".concat(n.row,"-").concat(n.col)).className="node node-shortest-path")}),30*t),n++},i=0;i<e.length;i++)a(i);setTimeout((function(){t.clearGrid()}),20*n*2),setTimeout((function(){t.startVisualization()}),20*n*2)}},{key:"visualizeDijkstra",value:function(){var e=this.state.grid,t=e[10][15],n=e[10][35],a=performance.now(),i=function(e,t,n){var a=[];t.distance=0;for(var i=f(e);i.length;){E(i);var r=i.shift();if(!r.isWall){if(r.distance===1/0)return a;if(r.isVisited=!0,a.push(r),r===n)return a;v(r,e)}}}(e,t,n),r=performance.now(),s=p(n);this.animateAlgorithm(i,s),this.recordPerofrmence("dijkstras",r-a,i.length,s.length)}},{key:"visualizeAstar",value:function(){var e=this.state.grid,t=e[10][15],n=e[10][35],a=performance.now(),i=function(e,t,n){t.distance=0,t.cost=0;var a=[],i=[];for(a.push(t);a.length>0;){for(var r=0,s=a[0],l=0;l<a.length;l++)a[l].cost<s.cost&&(r=l);if((s=a[r]).isFinish)return i.push(n),i;a.splice(r,1),i.push(s);var o=g(s,e);for(l=0;l<o.length;l++)if(!i.includes(o[l])){var c=s.distance+1,d=!1;a.includes(o[l])?c<o[l].distance&&(o[l].distance=c,d=!0):(o[l].distance=c,d=!0,a.push(o[l])),d&&(y(o[l],n),o[l].previousNode=s),y(o[l],n)}}return i}(e,t,n),r=performance.now(),s=p(n);this.animateAlgorithm(i,s),this.recordPerofrmence("astar",r-a,i.length,s.length)}},{key:"visualizeBfs",value:function(){var e=this.state.grid,t=e[10][15],n=e[10][35],a=performance.now(),i=function(e,t,n){var a=[],i=[];for(t.isVisited=!0,a.push(t);a.length>0;){var r=a.shift();if(n===r)return i;if(!r.isWall)for(var s=w(e,r),l=0;l<s.length;l++){var o=s[l];o.isVisited=!0,o.previousNode=r,i.push(o),a.push(o)}}return i}(e,t,n),r=performance.now(),s=p(n);this.animateAlgorithm(i,s),this.recordPerofrmence("bfs",r-a,i.length,s.length)}},{key:"visualizeDfs",value:function(){var e=this.state.grid,t=e[10][15],n=e[10][35],a=performance.now(),i=function(e,t,n){var a=[],i=[];for(t.isVisited=!0,a.push(t);a.length>0;){var r=a.pop();if(r.isVisited=!0,n===r)return i;if(!r.isWall)for(var s=k(e,r),l=0;l<s.length;l++){var o=s[l];o.isVisited||(o.previousNode=r,i.push(o),a.push(o))}}return i}(e,t,n),r=performance.now(),s=p(n);this.animateAlgorithm(i,s),this.recordPerofrmence("dfs",r-a,i.length,s.length)}},{key:"selectionfunction",value:function(e){var t=this.state.currentAlgorithm,n=this.state.numberOfAlgos;t.includes(e)||(t.push(e),this.setState({numberOfAlgos:n+1}),this.setState({disabledStart:!1}))}},{key:"startVisualization",value:function(){var e=this.state.currentAlgorithm,t=(this.state.numberOfAlgos,e.pop());this.setState({disabledStart:!0});var n=document.getElementById("currentAlgo");n.innerHTML=void 0!=t?"Current Algorithm:  "+t:"","dijsktras"==t&&this.visualizeDijkstra(),"astar"==t&&this.visualizeAstar(),"bfs"==t&&this.visualizeBfs(),"dfs"==t&&this.visualizeDfs(),0===e.length&&(document.getElementById("table").style.display="inline-table",document.getElementById("timeList").style.display="block",document.getElementById("spaceList").style.display="block",this.displayPerformance())}},{key:"render",value:function(){var e=this,t=this.state,n=t.grid,a=t.mouseIsPressed;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"navBar"},s.a.createElement("a",{href:"http://localhost:3000/",className:"onlyLeft"},"  ",s.a.createElement("b",null," Pathfinding Visualizer ")),s.a.createElement("a",null,"  ",s.a.createElement("button",{onClick:function(){return e.startVisualization()},className:"newTools",disabled:this.state.disabledStart}," ",s.a.createElement("b",null,"Visualize!")," ")),s.a.createElement("div",{className:"dropDown"},s.a.createElement("label",{className:"dropBtn"},s.a.createElement("b",null," Algorithms ")),s.a.createElement("select",{className:"dropdown-algo",id:"dropdown-algo",multiple:!0},s.a.createElement("option",{onClick:function(){return e.selectionfunction("dijsktras")},id:"dijsktras",className:"algoBar"}," Dijkstra's algorithm "),s.a.createElement("option",{onClick:function(){return e.selectionfunction("astar")},id:"astar",className:"algoBar"},"  Astar algorithm  "),s.a.createElement("option",{onClick:function(){return e.selectionfunction("bfs")},id:"bfs",className:"algoBar"},"  Bfs algorithm  "),s.a.createElement("option",{onClick:function(){return e.selectionfunction("dfs")},id:"dfs",className:"algoBar"},"  Dfs algorithm   "))),s.a.createElement("div",{className:"wall"},s.a.createElement("a",{className:"dropWall"},s.a.createElement("b",null," Wall ")," "),s.a.createElement("div",{className:"dropdown-wall"},s.a.createElement("a",{onClick:function(){var t=function(e){for(var t=e,n=0;n<t.length;n++)for(var a=0;a<t[n].length;a++)Math.random()<.1&&(t[n][a].isWall=!0);return t}(e.state.grid);e.setState({grid:t})}},"  ",s.a.createElement("a",null," Level 1")," "),s.a.createElement("a",{onClick:function(){var t=function(e){for(var t=e,n=0;n<e.length;n++)for(var a=0;a<t[n].length;a++)Math.random()<.2&&(t[n][a].isWall=!0);return t}(e.state.grid);e.setState({grid:t})}},"  ",s.a.createElement("a",null," Level 2")," "),s.a.createElement("a",{onClick:function(){var t=function(e){for(var t=e,n=0;n<t.length;n++)for(var a=0;a<e[n].length;a++)Math.random()<.3&&(t[n][a].isWall=!0);return t}(e.state.grid);e.setState({grid:t})}},"  ",s.a.createElement("a",null," Level 3")," "),s.a.createElement("a",{onClick:function(){var t=function(e){for(var t=e,n=0,a=0;a<t[0].length;a+=2){for(n=0;n<t.length;n++)t[n][a].isWall=!0;t[b(t.length)][a].isWall=!1,t[b(t.length)][a].isWall=!1}return t}(e.state.grid);e.setState({grid:t})}},"  ",s.a.createElement("a",null," Generate Maze")," "))),s.a.createElement("a",{href:"http://localhost:3000/"}," ",s.a.createElement("b",null," Reset"))),s.a.createElement("div",{id:"analysisContainer"},s.a.createElement("div",{id:"tableContainer"},s.a.createElement(N.a,{id:"table"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{id:"algorithm"}),s.a.createElement("th",{id:"time"}),s.a.createElement("th",{id:"distance"}),s.a.createElement("th",{id:"visitedNodes"}))),s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",{id:"name0"}),s.a.createElement("td",{id:"time0"}),s.a.createElement("td",{id:"distance0"}),s.a.createElement("td",{id:"visitedNodes0"})),s.a.createElement("tr",null,s.a.createElement("td",{id:"name1"}),s.a.createElement("td",{id:"time1"}),s.a.createElement("td",{id:"distance1"}),s.a.createElement("td",{id:"visitedNodes1"})),s.a.createElement("tr",null,s.a.createElement("td",{id:"name2"}),s.a.createElement("td",{id:"time2"}),s.a.createElement("td",{id:"distance2"}),s.a.createElement("td",{id:"visitedNodes2"})),s.a.createElement("tr",null,s.a.createElement("td",{id:"name3"}),s.a.createElement("td",{id:"time3"}),s.a.createElement("td",{id:"distance3"}),s.a.createElement("td",{id:"visitedNodes3"}))))),s.a.createElement("div",{id:"listContainer1"},s.a.createElement("ul",{id:"timeList"},s.a.createElement("a",{id:"timelist"}),s.a.createElement("li",{id:"timerow0"}),s.a.createElement("li",{id:"timerow1"}),s.a.createElement("li",{id:"timerow2"}),s.a.createElement("li",{id:"timerow3"}))),s.a.createElement("div",{id:"listContainer2"},s.a.createElement("ul",{id:"spaceList"},s.a.createElement("a",{id:"spacelist"}),s.a.createElement("li",{id:"spacerow0"}),s.a.createElement("li",{id:"spacerow1"}),s.a.createElement("li",{id:"spacerow2"}),s.a.createElement("li",{id:"spacerow3"})))),s.a.createElement("div",{id:"currentAlgo"}),s.a.createElement("div",{className:"grid"},n.map((function(t,n){return s.a.createElement("div",{key:n},t.map((function(t,n){var i=t.row,r=t.col,l=t.isFinish,o=t.isStart,c=t.isWall;return s.a.createElement(m,{key:n,col:r,isFinish:l,isStart:o,isWall:c,mouseIsPressed:a,onMouseDown:function(t,n){return e.handleMouseDown(t,n)},onMouseEnter:function(t,n){return e.handleMouseEnter(t,n)},onMouseUp:function(){return e.handleMouseUp()},row:i})})))}))))}}]),n}(r.Component),B=function(){for(var e=[],t=0;t<20;t++){for(var n=[],a=0;a<50;a++)n.push(I(a,t));e.push(n)}return e},I=function(e,t){return{col:e,row:t,isStart:10===t&&15===e,isFinish:10===t&&35===e,distance:1/0,isVisited:!1,isWall:!1,previousNode:null}},L=function(e,t,n){var a=e.slice(),i=a[t][n],r=Object(l.a)(Object(l.a)({},i),{},{isWall:!i.isWall});return a[t][n]=r,a};n(18);i.a.render(s.a.createElement(M,null),document.getElementById("root"))}},[[11,1,2]]]);
//# sourceMappingURL=main.58789dc6.chunk.js.map