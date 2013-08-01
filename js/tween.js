// returns a copy of array source
function copyArray(source) {
	var copy = new Array();
	var len = source.length;
	for (var i = 0; i < len; i++) {
		copy[copy.length] = source[i];
	}
	return copy;
}

// returns an array populated with integers 1..n
function integerArray(n) {
	var arr = new Array();
	for (var i=0; i < n; i++) {
		arr[arr.length] = i;
	}
	return arr;
}

// clears the browser page
// note: will fail if page contains no data
function clearPage() {
	document.getElementsByTagName("body")[0].innerHTML = "";
}

// returns a 0 indexed array with one element for every line of data in filepath
function loadFileIntoArray(filepath) {
	if (window.XMLHttpRequest)
	{
		var xhttp = new XMLHttpRequest();
	}
	else // Internet Explorer 5/6
	{
		var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filepath,false);
	xhttp.send("null");
	var data = xhttp.responseText;
	
	var re = new RegExp("^.*$", "mg");
		
	var dataArray = data.match(re);

	return dataArray;
}

// prints an array to the webpage - omits any undefined or null elements 
function writeArray(source) {
	for (var i=0; i < source.length; i++) {
		if (source[i] != undefined && source[i] != null) {
			document.write(i + ": " + source[i] + "<br />");
		}
	}
	
}

// returns an array containing the indices of elements in source and target that differ
// and optionally writes the output to the page
// assumes source.length == target.length
function compareArrays(source, target, print) {
	var diff = new Array();
	
	for (var i=0; i < source.length; i++) {
		if (source[i] != target[i]) {
			diff[diff.length] = i;
		}
	}
	
	if (print) {
		var diffPrint = new Array();
		for (var i=0; i < diff.length; i++) {
			diffPrint[diff[i]] = [source[diff[i]], target[diff[i]]];
		}
		writeArray(diffPrint);
	}
	
	return diff; 
	
}

/////////////////////////////////////////////////////////////////////////////
///////------------------------------MY CODE---------------------------//////
/////////////////////////////////////////////////////////////////////////////

var _filename = "tweens600.txt";
var _geneticData = loadFileIntoArray(_filename); 	//---it stores genetic data of all the tweens
var _relationshipMap = new Array();					//---it stores relationship information among all the tweens (0: not related, 1: parent node, some value greater than 1: related but not visited)
var _upperLimit = 147;								//---upperlimit of the range of approximation in terms of number of different bits when cloned
var _lowerLimit =91;								//---lowerlimit of the range of approximation in terms of number of different bits when cloned
var _freq = new Array();							//---number of relations of a tween
var _genLength  = _geneticData.length;				//---number of tweens
var _genLengthFreq = _genLength;					//---its the 600th index of _relationshipMap that represents the number of relations
var _parentIndex = new Array();						//---its an array which keeps info about parent of all the leaf node (i.e. node without any children); if index (i) has value 1 then its the parent otherwise not
var _freqSum = 0;									//---it stores the sum of all the number of relatioships at every iteration in toFindParentList() function;
var _currentParent = 0;
var _theParentList = new Array();					//---it stores the parent of that index
var _diff82 = new Array();							//---it stores the number of different bits in 82nd tween with the rest of the tweens.
var _toCorrect = 82 ;							
var _index = 1;


function initFunctions(){
	for(var i=0; i<_genLength; i++){
	 	_freq[i] = 0 ;
	 	_parentIndex[i]= 0;
	}

	for(var i=0; i<_genLength; i++){
		 var _diff = compareArrays(_geneticData[82], _geneticData[i]).length;
		 _diff82[i] = new Array();
		 _diff82[i][1] = _diff ;
		 _diff82[i][0] = i ;
		}
	
	_diff82.sort( function( a, b ){
		  if ( a[1] == b[1] ) return 0;
		  return a[1] < b[1] ? -1 : 1;
		});
}

function freqSum(){
	_freqSum = 0 ;
	for(var i=0; i<_genLength; i++)
		_freqSum += _relationshipMap[i][_genLengthFreq];
}

	
function initRelationshipMap(){
	
	for (var i=0; i< _genLength; i++){
		_relationshipMap[i] = [];

		for(var j=0; j< _genLength+2; j++){
			_relationshipMap[i][j] = 0 ;
		}
	}

	fillMapWithDiff();
}


function toAdjust(){
	for(var i=1; i<_genLength; i++){
		for(var j=0; j<_genLength; j++ ){
			
			if (_relationshipMap[_toCorrect][j] != 0 ) {
				if( _diff82[i][0] == j) {
					_index++;
				}
			}

		}
	}
	
	_relationshipMap[_toCorrect][_diff82[_index][0] ] = _diff82[_index][1];
	_relationshipMap[_diff82[_index][0] [_toCorrect]] = _diff82[_index][1];
	_relationshipMap[_toCorrect][_genLengthFreq]++;
	_relationshipMap[_diff82[_index][0]][_genLengthFreq]++;
}


function fillMapWithDiff()
{
	for (var i=0; i<_genLength; i++){
		for (var j=0; j<_genLength; j++){
			var _diff = compareArrays( _geneticData[i], _geneticData[j] ).length;

			if( _diff >= _lowerLimit   &&  _diff <= _upperLimit ){
					
					_relationshipMap[i][j] = _diff;
					++(_relationshipMap[i][_genLengthFreq]);
					++_freq[i];
					_currentParent = j;
				} 
		}		
		
		if(_freq[i] == 1){
			_parentIndex[i] = _currentParent; 	
			_theParentList[i] = _currentParent;
		}
	}

	toAdjust();
}


function refreshParentIndex(){
	initFunctions();
	for(var i=0; i<_genLength; i++){
		if(_relationshipMap[i][_genLengthFreq] == 1){
			for(var j=0; j<_genLength; j++){
				if(_relationshipMap[i][j] != 0){
						_parentIndex[i] = j;
						_theParentList[i] = j;
					}
			}
		}
		else
			_parentIndex[i] = 0;	
	}
}


function toFindParentList(){
	
	freqSum();
	
	while(_freqSum > 0 ){
				for (var i=0; i<_genLength; i++){

					if(_relationshipMap[i][_genLengthFreq] == 1){
						_relationshipMap[i][_parentIndex[i]] = 1 ;
						_relationshipMap[i][_genLengthFreq] = 0;
					}
				}
				
				for(var i=0; i<_genLength; i++){

					if(_parentIndex[i] != 0 ){
						_relationshipMap[_parentIndex[i]][i] = 0;
						--(_relationshipMap[_parentIndex[i]][_genLengthFreq]);
					}
				}
				
				freqSum();
				refreshParentIndex();
			}
}

//////////-------------Display Functions-----------/////////////

function displayTheParentList(){
	for(var i=0; i<_genLength; i++){
		if(typeof _theParentList[i] == 'undefined')
			_theParentList[i] = -1 ;
	}

	document.write("</br>Child->Parent (Relationship), (-1 = Super Parent)</br></br>");
	for(var i=0; i<_genLength; i++){
		document.write(i + " -> " + _theParentList[i] + "</br>");
	}
}

///////////-----------------Main()---------------//////////////////

function main()
{
	 initFunctions();		
	 
	 initRelationshipMap();
	 
	 toFindParentList();

	 displayTheParentList();
	
	return 0;
}