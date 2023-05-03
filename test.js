let data = [
    [
        {
            "text": "Following words from left to right, top to bottom, and page by page",
            "check": true
        },
        {
            "text": "Recognizing that spoken words are represented in written language by specific sequences of letters",
            "check": true
        },
        {
            "text": "Understanding that words are separated by spaces in print",
            "check": false
        },
        {
            "text": "Recognizing and naming all upper-case letters of the alphabet",
            "check": false
        },
        {
            "text": "Recognizing and naming all lower-case letters of the alphabet",
            "check": false
        },
        {
            "text": "Recognizing the distinguishing features of a sentence (e.g., first word, capitalization, ending punctuation)",
            "check": false
        }
    ],
    [
        
        {
            "text": "Isolating and pronouncing initial, medial vowel, and final sounds (phonemes) in spoken single-syllable words",
            "check": false
        },
        {
            "text": "Segmenting spoken single-syllable words into their complete sequence of individual sounds (phonemes)",
            "check": false
        }
    ]
]

let countTrue = 0;
for (let array of data) {
  if (array.length >= 3) {
    let trueCount = 0;
    for (let obj of array) {
      if (obj.check) {
        trueCount++;
      }
    }
    if (trueCount >= 3) {
      countTrue++;
    }
  }
}

if (countTrue === data.filter(array => array.length >= 3).length) {
  console.log("Every array with length greater than or equal to 3 has at least 3 'check' values that are true.");
} else {
  console.log("Not every array with length greater than or equal to 3 has at least 3 'check' values that are true.");
}
