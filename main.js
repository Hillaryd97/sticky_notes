document.getElementById("myForm").addEventListener("submit", saveNotes);


const myColor = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

// var today = new Date();
// var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
// var time = today.getHours() + ":" + today.getMinutes();
// var dateTime = date;


// Save new notes to local storage
function saveNotes(e) {
  e.preventDefault();

  var noteEntry = document.getElementById("note-entry").value;

  if (!noteEntry) {
    alert("Please fill in the form");
    return false;
  }

  var note = {
    id: Math.floor(Math.random() * 100000),
    entry: noteEntry,
    noteColor: myColor(),
    // DateTime: dateTime,
  };

  if (localStorage.getItem("notes") === null) {
    var notes = [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  } else {
    var notes = JSON.parse(localStorage.getItem("notes"));
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  document.getElementById("myForm").reset();

  fetchNotes();
}

function deleteNote(id) {
  var notes = JSON.parse(localStorage.getItem("notes"));
  for (var i = 0; i < notes.length; i++) {
    if (notes[i].id == id) {
      // remove from array
      notes.splice(i, 1);
    }
  }

  localStorage.setItem("notes", JSON.stringify(notes));

  fetchNotes();
}

function fetchNotes() {
  var notes = JSON.parse(localStorage.getItem("notes"));

  var noteOutput = document.getElementById("note-output");

  noteOutput.innerHTML = "";

  for (var i = notes.length - 1; i >= 0; i--) {
    var entry = notes[i].entry;
    var id = notes[i].id;
    var noteColor = notes[i].noteColor;
    // var date = notes[i].DateTime
    

    noteOutput.innerHTML +=
      '<div class="col-md-6 mt-3 text-center">' +
      '<textarea disabled id="note-display"' +
      'class="note-display p-3 mb-2 mt-2" style="background-color:' +
      noteColor +
      ' ;">' +
      entry + 
      "</textarea> <br>" +
      "<a onclick=\"deleteNote('" +
      id +
      '\')" class="p-3 text-light pt-1 pb-2 text-center del-btn  text-center" href="#">Delete</a></div>';
  }
  // const myColor = () => {
  //   let n = (Math.random() * 0xfffff * 1000000).toString(16);
  //   return '#' + n.slice(0, 6);
  // }
  // actualEntry = document.getElementById('note-display');
  // actualEntry.style.backgroundColor = myColor();
  // actualEntry.style.Color = '#000000';
}
