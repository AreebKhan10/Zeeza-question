import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCheck } from "react-icons/md";
import Footer from "../components/Footer";
import SingleQuestion from "./SingleQuestion";
import axios from "axios";
import menu from "../assets/menu.png";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import { data } from "autoprefixer";

export default function Questions() {
  const [id, setID] = useState(0);
  const [QuesID, setQuesID] = useState(0);
  const [MultiLimit, setMultiLimit] = useState([]);
  const [MultiLimitSub, setMultiLimitSub] = useState([]);
  const [CheckID, setUpdateCheck] = useState();
  const [goalLevel, setgoalLevel] = useState();
  const [stuDetails, setStuDetails] = useState({});
  const [responceData, setResponceData] = useState([]);
  const [currentSelected, setCurrentSelected] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({
    title: "",
    question: [],
    select: "",
  });
  const [currentNav, setCurrentNav] = useState(0);

  var { filteredJSON, setFilteredJSON, update } = useGlobalContext();

  let initialData = [
    {
      id: 1,
      title: "Background",
      questions: [
        {
          isUpdated: false,
          questionID: 1,
          subTitle: "Areas of Struggle",
          description: "Select 1 to 3",
          question: `Which areas does name struggle with most?`,
          select: "Multi",
          min: 1,
          max: 3,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "attention and focus skills",
              check: false,
              show: [0, 1, 2, 3],
            },
            {
              id: 2,
              value: "long term memory",
              check: false,
              show: [0, 1, 2, 3],
            },
            {
              id: 3,
              value: "short term memory",
              check: false,
              show: [0, 1, 2, 3],
            },
            {
              id: 4,
              value: "working memory",
              check: false,
              show: [0, 1, 2, 3],
            },
            {
              id: 5,
              value: "emotional regulation",
              check: false,
              show: [0, 1, 2, 3],
            },
            {
              id: 6,
              value: "auditory processing",
              check: false,
              show: [0, 1, 2, 3],
            },
            { id: 7, value: "language skills", check: false, show: [0, 1, 2] },
            { id: 8, value: "reading skills", check: false, show: [0, 1, 2] },
            {
              id: 9,
              value: "phonemic awareness",
              check: false,
              show: [0, 1, 2],
            },
            {
              id: 10,
              value: "executive function skills",
              check: false,
              show: [3],
            },
            {
              id: 11,
              value: "visual-spatial awareness",
              check: false,
              show: [3],
            },
            { id: 12, value: "math skills", check: false, show: [3] },
          ],
        },
        {
          isUpdated: false,
          questionID: 2,
          subTitle: "Functioning Rate",
          description: "Select 1",
          question: "Rate name's level of functioning in these areas",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "very poor",
              check: false,
            },
            {
              id: 2,
              value: "poor",
              check: false,
            },
            {
              id: 3,
              value: "below average",
              check: false,
            },
            {
              id: 4,
              value: "slightly below average",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 3,
          subTitle: "Academic Domains",
          description: "Select 1 to 2",
          question: "Which academic domains does name struggle with?",
          select: "Multi",
          min: 1,
          max: 2,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "decoding",
              check: false,
              isHidden: false,
            },
            {
              id: 2,
              value: "reading fluency",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "reading comprehension",
              check: false,
              isHidden: false,
            },
            {
              id: 4,
              value: "math computation",
              check: false,
              isHidden: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 4,
          subTitle: "Interests",
          question: "What are name's interests?",
          description: "Select 1 to 3",
          select: "Multi",
          min: 1,
          max: 3,
          limit: false,
          answered: false,
          options: [
            { id: 1, value: "drawing", check: false },
            { id: 2, value: "coloring", check: false },
            { id: 3, value: "singing", check: false },
            { id: 4, value: "dancing", check: false },
            { id: 5, value: "playing with dolls", check: false },
            { id: 6, value: "playing with cars", check: false },
            { id: 7, value: "playing games", check: false },
            { id: 8, value: "playing with stickers", check: false },
            { id: 9, value: "sports", check: false },
            { id: 10, value: "gymnastics", check: false },
            { id: 11, value: "tickets", check: false },
            { id: 12, value: "computers", check: false },
            { id: 13, value: "technology", check: false },
            { id: 14, value: "playing with animals", check: false },
          ],
        },
        {
          isUpdated: false,
          questionID: 5,
          subTitle: "Incorporate Interests",
          description: "Select 1",
          question:
            "Why do you incorporate these interests into your sessions?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "to keep name focused on the lesson",
              check: false,
            },
            {
              id: 2,
              value: "to improve name's willingness to learn",
              check: false,
            },
            {
              id: 3,
              value: "to make name's learning experience pleasurable",
              check: false,
            },
            {
              id: 4,
              value: "to make name's learning more exciting for name",
              check: false,
            },
            {
              id: 5,
              value: "to increase name's attention while learning",
              check: false,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Decoding",
      questions: [
        {
          isUpdated: false,
          questionID: 6,
          subTitle: "Decoding Rate",
          description: "Select 1",
          question: "How would you rate name's performance in decoding?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "very poor performance",
              check: false,
            },
            {
              id: 2,
              value: "poor performance",
              check: false,
            },
            { id: 3, value: "below average performance", check: false },
          ],
        },
        {
          isUpdated: false,
          questionID: 7,
          subTitle: "Decoding Areas",
          description: "Select 1",
          question: "How many areas of decoding does name struggle with?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "most",
              check: false,
            },
            {
              id: 2,
              value: "many",
              check: false,
            },
            { id: 3, value: "some", check: false },
            { id: 4, value: "few", check: false },
          ],
        },
        {
          isUpdated: false,
          questionID: 8,
          subTitle: "Grade Level",
          description: "Select 1",
          question: "Rate name's grade level in decoding",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "Pre-K",
              check: false,
              level: 1,
              isHidden: false,
            },
            {
              id: 2,
              value: "lower kindergarten",
              check: false,
              level: 1,
              isHidden: false,
            },
            {
              id: 3,
              value: "mid-kindergarten",
              check: false,
              level: 1,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-kindergarten",
              check: false,
              level: 1,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning first grade",
              check: false,
              level: 2,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-first grade",
              check: false,
              level: 2,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-first grade",
              check: false,
              level: 2,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning-second grade",
              check: false,
              level: 3,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-second grade",
              check: false,
              level: 3,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-second grade",
              check: false,
              level: 3,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning third grade",
              check: false,
              level: 4,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-third grade",
              check: false,
              level: 4,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-third grade",
              check: false,
              level: 4,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning fourth grade",
              check: false,
              level: 5,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-fourth grade",
              check: false,
              level: 5,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-fourth grade",
              check: false,
              level: 5,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning fifth grade",
              check: false,
              level: 6,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-fifth grade",
              check: false,
              level: 6,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-fifth grade",
              check: false,
              level: 6,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning sixth grade",
              check: false,
              level: 7,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-sixth grade",
              check: false,
              level: 7,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-sixth grade",
              check: false,
              level: 7,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning seventh grade",
              check: false,
              level: 8,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-seventh grade ",
              check: false,
              level: 8,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper seventh grade",
              check: false,
              level: 8,
              isHidden: false,
            },
            {
              id: 4,
              value: "beginning eighth grade",
              check: false,
              level: 9,
              isHidden: false,
            },
            {
              id: 4,
              value: "mid-eighth grade",
              check: false,
              level: 9,
              isHidden: false,
            },
            {
              id: 4,
              value: "upper-eighth grade",
              check: false,
              level: 9,
              isHidden: false,
            },
          ],
        },
        // {
        // questionID : 8,
        //   subTitle: "Instruction Type",
        //   description: "Minimum 1",
        //   question: "What type of instruction do you utilize during sessions?",
        //   select: "single",
        //   answered: false,
        //   isRandom: true,
        //   options: [
        //     { id: 1, value: "Explicit instruction", check: false },
        //     { id: 2, value: "Individualized instruction", check: false },
        //     { id: 3, value: "Concrete instruction", check: false },
        //     { id: 4, value: "Step-by-step instruction", check: false },
        //     { id: 5, value: "Scaffolded instruction", check: true },
        //     { id: 6, value: "Skilled intervention", check: false },
        //     { id: 7, value: "1:1 intervention", check: false },
        //   ],
        // },
        {
          isUpdated: false,
          questionID: 9,
          subTitle: "Reading Methodology",
          description: "Select 1 to 3",
          question:
            "Which types of methodology do you use during reading instruction?",
          select: "Multi",
          answered: false,
          min: 1,
          max: 3,
          limit: false,
          options: [
            { id: 1, value: "ORTON GILLIINGHAM Methodology", check: false },
            { id: 2, value: "WILSON Methodology", check: false },
            { id: 3, value: "LIPS Methodology", check: false },
            { id: 4, value: "Visual Aids", check: false },
            { id: 5, value: "Tactile Manipulatives", check: false },
            { id: 6, value: "Concrete Manipulatives", check: false },
            { id: 7, value: "Magnet Cards", check: false },
            { id: 8, value: "Phonics Cubes", check: false },
          ],
        },
        {
          isUpdated: false,
          questionID: 10,
          subTitle: "Descriptive Rating Chart",
          description: "Select 1",
          question: "How would you rate name's progress in decoding?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            { id: 1, text: "very little", value: "very little", check: false },
            { id: 2, text: "minimal", value: "minimal", check: false },
            { id: 3, text: "some", value: "some", check: false },
            { id: 4, text: "significant", value: "significant", check: false },
            { id: 5, text: "major", value: "major", check: false },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 11,
          subTitle: "Decoding Goals",
          description:
            "Select 2 smart goals and 3 goals per smart goal",
          question: "What are your decoding goals for the year?",
          select: "Accordian",
          dependQuestion: 2,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title:
                "Demonstrate understanding of the organization and basic features of print",
              level: 1,
              subGoals: [
                "Following words from left to right, top to bottom, and page by page",
                "Recognizing that spoken words are represented in written language by specific sequences of letters",
                "Understanding that words are separated by spaces in print",
                "Recognizing and naming all upper-case letters of the alphabet",
                "Recognizing and naming all lower-case letters of the alphabet",
              ],
            },
            {
              title:
                "Demonstrate understanding of spoken words, syllables, and sounds (phonemes)",
              level: 1,
              subGoals: [
                "Recognizing and producing rhyming words",
                "Counting, pronouncing, blending, and segmenting syllables in spoken words",
                "Blending and segmenting onsets and rimes of single-syllable spoken words",
                "Isolating and pronouncing the initial, medial vowel, and final sounds (phonemes) in three-phoneme (consonant-vowel-consonant, or CVC) words",
                "Adding or substituting individual sounds (phonemes) in simple, one-syllable words to make new words",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 1,
              subGoals: [
                "Demonstrating basic knowledge of one-to-one letter-sound correspondences by producing the primary sound or many of the most frequent sounds for each consonant",
                "Associating the long and short sounds with the common spellings (graphemes) for the five major vowels",
                "Reading common high-frequency words by sight",
                "Distinguishing between similarly spelled words by identifying the sounds of the letters that differ",
              ],
            },
            {
              title:
                "Read emergent-reader texts with purpose and understanding",
              level: 1,
              subGoals: [
                "Adding or substituting individual sounds (phonemes) in simple, one-syllable words to make new words",
              ],
            },
            {
              title:
                "Demonstrate understanding of the organization and basic features of print",
              level: 2,
              subGoals: [
                "Recognizing the distinguishing features of a sentence (e.g., first word, capitalization, ending punctuation)",
              ],
            },
            {
              title:
                "Demonstrate understanding of spoken words, syllables, and sounds (phonemes)",
              level: 2,
              subGoals: [
                "Distinguishing long from short vowel sounds in spoken single-syllable words",
                "Orally producing single-syllable words by blending sounds (phonemes), including consonant blends",
                "Isolating and pronouncing initial, medial vowel, and final sounds (phonemes) in spoken single-syllable words",
                "Segmenting spoken single-syllable words into their complete sequence of individual sounds (phonemes)",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 2,
              subGoals: [
                "Decoding regularly spelled one-syllable words",
                "Decoding words in the CVC format",
                "De+ams",
                "Decoding words with diphthongs",
                "Decoding words with r-controlled vowels",
                "Using knowledge that every syllable must have a vowel sound to determine the number of syllables in a printed word",
                "Decoding two-syllable words following basic patterns by breaking the words into syllables",
                "Reading words with inflectional endings",
                "Recognizing and reading grade-appropriate irregularly spelled words",
              ],
            },
            {
              title:
                "Read with sufficient accuracy and fluency to support comprehension",
              level: 2,
              subGoals: [
                "Reading text with purpose and understanding",
                "Reading text orally with accuracy, appropriate rate, and expression on successive readings",
                "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 3,
              subGoals: [
                "Distinguishing long and short vowels when reading regularly spelled one-syllable words",
                "Knowing spelling-sound correspondences for additional common vowel teams",
                "Decoding regularly spelled two-syllable words with long vowels",
                "Decoding words with common prefixes and suffixes",
                "Identifying words with inconsistent but common spelling-sound correspondences. Recognizing and reading grade-appropriate irregularly spelled words",
              ],
            },
            {
              title:
                "Read with sufficient accuracy and fluency to support comprehension",
              level: 3,
              subGoals: [
                "Reading text with purpose and understanding",
                "Reading text orally with accuracy, appropriate rate, and expression on successive readings",
                "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 4,
              subGoals: [
                "Identifying and know the meaning of the most common prefixes and derivational suffixes",
                "Decoding words with common Latin suffixes",
                "Decoding multisyllable words",
                "Reading grade-appropriate irregularly spelled words",
                "Reading with sufficient accuracy and fluency to support comprehension",
              ],
            },
            {
              title: "Read text with purpose and understanding",
              level: 4,
              subGoals: [
                "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 5,
              subGoals: [
                "Using combined knowledge of all letter-sound correspondences, syllabication patterns, and morphology",
              ],
            },
            {
              title:
                "Read with sufficient accuracy and fluency to support comprehension",
              level: 5,
              subGoals: [
                "Reading text with purpose and understanding",
                "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
              ],
            },
            {
              title:
                "Know and apply phonics and word analysis skills in decoding words",
              level: 6,
              subGoals: [
                "Using combined knowledge of all letter-sound correspondences, syllabication patterns, and morphology (e.g., roots and affixes) to read accurately unfamiliar multisyllabic words in context and out of context",
              ],
            },
            {
              title:
                "Read with sufficient accuracy and fluency to support comprehension",
              level: 6,
              subGoals: [
                "Reading text with purpose and understanding",
                "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
              ],
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 12,
          subTitle: "Struggles",
          description: "Select 3 to 5",
          question:
            "Which areas in decoding does your student still struggle with?",
          select: "Accordian",
          dependQuestion: 2,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title:
                "Demonstrate understanding of the organization and basic features of print",
              subGoals: [
                {
                  title:
                    "Following words from left to right, top to bottom, and page by page",
                  level: 1,
                },
                {
                  title:
                    "Recognizing that spoken words are represented in written language by specific sequences of letters",
                  level: 1,
                },
                {
                  title:
                    "Understanding that words are separated by spaces in print",
                  level: 1,
                },
                {
                  title:
                    "Recognizing and naming all upper-case letters of the alphabet",
                  level: 1,
                },
                {
                  title:
                    "Recognizing and naming all lower-case letters of the alphabet",
                  level: 1,
                },
                { title: "Recognizing and producing rhyming words", level: 1 },
                {
                  title:
                    "Counting, pronouncing, blending, and segmenting syllables in spoken words",
                  level: 1,
                },
                {
                  title:
                    "Blending and segmenting onsets and rimes of single-syllable spoken words",
                  level: 1,
                },
                {
                  title:
                    "Isolating and pronouncing the initial, medial vowel, and final sounds (phonemes) in three-phoneme (consonant-vowel-consonant, or CVC) words",
                  level: 1,
                },
                {
                  title:
                    "Adding or substituting individual sounds (phonemes) in simple, one-syllable words to make new words",
                  level: 1,
                },
                {
                  title:
                    "Demonstrating basic knowledge of one-to-one letter-sound correspondences by producing the primary sound or many of the most frequent sounds for each consonant",
                  level: 1,
                },
                {
                  title:
                    "Associating the long and short sounds with the common spellings (graphemes) for the five major vowels",
                  level: 1,
                },
                {
                  title:
                    "Reading common high-frequency words by sight (e.g., the, of, to, you, she, my, is, are, do, does)",
                  level: 1,
                },
                {
                  title:
                    "Distinguishing between similarly spelled words by identifying the sounds of the letters that differ",
                  level: 1,
                },
                {
                  title:
                    "Adding or substituting individual sounds (phonemes) in simple, one-syllable words to make new words",
                  level: 1,
                },
                {
                  title:
                    "Recognizing the distinguishing features of a sentence (e.g., first word, capitalization, ending punctuation)",
                  level: 2,
                },
                {
                  title:
                    "Distinguishing long from short vowel sounds in spoken single-syllable words",
                  level: 2,
                },
                {
                  title:
                    "Orally producing single-syllable words by blending sounds (phonemes), including consonant blends",
                  level: 2,
                },
                {
                  title:
                    "Isolating and pronouncing initial, medial vowel, and final sounds (phonemes) in spoken single-syllable words",
                  level: 2,
                },
                {
                  title:
                    "Segmenting spoken single-syllable words into their complete sequence of individual sounds (phonemes)",
                  level: 2,
                },
                {
                  title:
                    "Knowing the spelling-sound correspondences for common consonant digraphs",
                  level: 2,
                },
                {
                  title: "Decoding regularly spelled one-syllable words",
                  level: 2,
                },
                {
                  title: "Decoding regularly spelled one-syllable words",
                  level: 2,
                },
                { title: "Decoding words with consonant blends", level: 2 },
                { title: "Decoding words with consonant digraphs", level: 2 },
                { title: "Decoding words in the CVCe format", level: 2 },
                { title: "Decoding words with vowel teams", level: 2 },
                { title: "Decoding words with diphthongs", level: 2 },
                { title: "Decoding words with r-controlled vowels", level: 2 },
                {
                  title:
                    "Using knowledge that every syllable must have a vowel sound to determine the number of syllables in a printed word",
                  level: 2,
                },
                {
                  title:
                    "Decoding two-syllable words following basic patterns by breaking the words into syllables",
                  level: 2,
                },
                { title: "Reading words with inflectional endings", level: 2 },
                {
                  title:
                    "Recognizing and reading grade-appropriate irregularly spelled words",
                  level: 2,
                },
                {
                  title: "Reading text with purpose and understanding",
                  level: 2,
                },
                {
                  title:
                    "Reading text orally with accuracy, appropriate rate, and expression on successive readings",
                  level: 2,
                },
                {
                  title:
                    "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
                  level: 2,
                },
                {
                  title:
                    "Distinguishing long and short vowels when reading regularly spelled one-syllable words",
                  level: 3,
                },
                {
                  title:
                    "Knowing spelling-sound correspondences for additional common vowel teams",
                  level: 3,
                },
                {
                  title:
                    "Decoding regularly spelled two-syllable words with long vowels",
                  level: 3,
                },
                {
                  title: "Decoding words with common prefixes and suffixes",
                  level: 3,
                },
                {
                  title:
                    "Identifying words with inconsistent but common spelling-sound correspondences. Recognizing and reading grade-appropriate irregularly spelled words",
                  level: 3,
                },
                {
                  title: "Reading text with purpose and understanding",
                  level: 3,
                },
                {
                  title:
                    "Reading text orally with accuracy, appropriate rate, and expression on successive readings",
                  level: 3,
                },
                {
                  title:
                    "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
                  level: 3,
                },
                {
                  title:
                    "Identifying and know the meaning of the most common prefixes and derivational suffixes",
                  level: 4,
                },
                {
                  title: "Decoding words with common Latin suffixes",
                  level: 4,
                },
                { title: "Decoding multisyllable words", level: 4 },
                {
                  title: "Reading grade-appropriate irregularly spelled words",
                  level: 4,
                },
                {
                  title:
                    "Reading with sufficient accuracy and fluency to support comprehension",
                  level: 4,
                },
                {
                  title:
                    "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                  level: 4,
                },
                {
                  title:
                    "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
                  level: 4,
                },
                {
                  title:
                    "Using combined knowledge of all letter-sound correspondences, syllabication patterns, and morphology (e.g., roots and affixes) to read accurately unfamiliar multisyllabic words in context and out of context",
                  level: 5,
                },
                {
                  title: "Reading text with purpose and understanding",
                  level: 5,
                },
                {
                  title:
                    "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                  level: 5,
                },
                {
                  title:
                    "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
                  level: 5,
                },
                {
                  title:
                    "Using combined knowledge of all letter-sound correspondences, syllabication patterns, and morphology (e.g., roots and affixes) to read accurately unfamiliar multisyllabic words in context and out of context",
                  level: 6,
                },
                {
                  title: "Reading text with purpose and understanding",
                  level: 6,
                },
                {
                  title:
                    "Reading prose and poetry orally with accuracy, appropriate rate, and expression on successive readings",
                  level: 6,
                },
                {
                  title:
                    "Using context to confirm or self-correct word recognition and understanding, rereading as necessary",
                  level: 6,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Reading Comprehension",
      questions: [
        {
          isUpdated: false,
          questionID: 13,
          subTitle: "Deficits",
          description: "Select 1",
          question:
            "How would you describe name's deficits in reading comprehension?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "severe deficits",
              check: false,
            },
            {
              id: 2,
              value: "some deficits",
              check: false,
            },
            {
              id: 3,
              value: "minor deficits",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 14,
          subTitle: "Range",
          description: "Select 1",
          question:
            "How would you describe name’s range of difficulties in this domain?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "many areas of reading comprehension",
              check: false,
            },
            {
              id: 2,
              value: "some areas of reading comprehension",
              check: false,
            },
            {
              id: 3,
              value: "few areas of reading comprehension",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 15,
          subTitle: "Grade Level",
          description: "Select 1",
          question:
            "What is name’s approximate grade level in reading comprehension performance?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "Kindergarten",
              check: false,
              isHidden: false,
              level: 1,
            },
            {
              id: 2,
              value: "First Grade",
              check: false,
              isHidden: false,
              level: 2,
            },
            {
              id: 3,
              value: "Second Grade",
              check: false,
              isHidden: false,
              level: 3,
            },
            {
              id: 3,
              value: "Third Grade",
              check: false,
              isHidden: false,
              level: 4,
            },
            {
              id: 3,
              value: "Fourth Grade",
              check: false,
              isHidden: false,
              level: 5,
            },
            {
              id: 3,
              value: "Fifth Grade",
              check: false,
              isHidden: false,
              level: 6,
            },
            {
              id: 3,
              value: "Sixth Grade",
              check: false,
              isHidden: false,
              level: 7,
            },
            {
              id: 3,
              value: "Seventh Grade",
              check: false,
              isHidden: false,
              level: 8,
            },
            {
              id: 3,
              value: "Eighth Grade",
              check: false,
              isHidden: false,
              level: 9,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 16,
          subTitle: "Techniques",
          description: "Select 2 to 3",
          question: "Which techniques do you use during your sessions?",
          select: "Multi",
          answered: false,
          min: 2,
          max: 3,
          limit: false,
          options: [
            {
              id: 1,
              value: "graphic organizers",
              check: false,
            },
            {
              id: 2,
              value: "highlighting techniques",
              check: false,
            },
            {
              id: 3,
              value: "picture cards",
              check: false,
            },
            {
              id: 3,
              value: "visual aids",
              check: false,
            },
            {
              id: 3,
              value: "checklists",
              check: false,
            },
            {
              id: 3,
              value: "color coding techniques",
              check: false,
            },
            {
              id: 3,
              value: "questioning techniques",
              check: false,
            },
            {
              id: 3,
              value: "story maps",
              check: false,
            },
            {
              id: 3,
              value: "read-alouds",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 17,
          subTitle: "Progress",
          description: "Select 1",
          question:
            "Describe name’s progress in reading comprehension:",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "very little",
              check: false,
            },
            {
              id: 2,
              value: "minimal",
              check: false,
            },
            {
              id: 3,
              value: "some",
              check: false,
            },
            {
              id: 3,
              value: "tremendous",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 18,
          subTitle: "Goals",
          description:
            "Select 2 smart goals and 3 goals per smart goal",
          question: "What are your reading comprehension goals for the year?",
          select: "Accordian",
          dependQuestion: 2,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title: "Identifying key ideas and details",
              level: 1,
              subGoals: [
                "Ask and answer questions about key details in a text with prompting and support",
                "Identify the main topic and retell key details of a text with prompting and support",
                "Describe the connection between two individuals, events, ideas, or pieces of information in a text, with prompting and support",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 1,
              subGoals: [
                "Ask and answer questions about unknown words in a text with prompting and support",
                "Identify the front cover, back cover, and title page of a book",
                "Name the author and illustrator of a text and define the role of each in presenting the ideas or information in a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 1,
              subGoals: [
                "Describe the relationship between illustrations and the text in which they appear (e.g., what person, place, thing, or idea in the text an illustration depicts), with prompting and support",
                "Identify the reasons an author gives to support points in a text, with prompting and support",
                "Name the author and illustrator of a text and define the role of each in presenting the ideas or information in a text",
                "Identify basic similarities in and differences between two texts on the same topic (e.g., in illustrations, descriptions, or procedures), with prompting and support",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 2,
              subGoals: [
                "Ask and answer questions about key details in a text",
                "Identify the main topic and retell key details of a text",
                "Describe the connection between two individuals, events, ideas, or pieces of information in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 2,
              subGoals: [
                "Ask and answer questions to help determine or clarify the meaning of words and phrases in a text",
                "Distinguish between information provided by pictures or other illustrations and information provided by the words in a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 2,
              subGoals: [
                "Use the illustrations and details in a text to describe its key ideas",
                "Identify the reasons an author gives to support points in a text",
                "Identify basic similarities in and differences between two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 3,
              subGoals: [
                "Ask and answer such questions as who, what, where, when, why, and how to demonstrate understanding of key details in a text",
                "Identify the main topic of a multi-paragraph text as well as the focus of specific paragraphs within the text",
                "Describe the connection between a series of historical events, scientific ideas or concepts, or steps in technical procedures in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 3,
              subGoals: [
                "Determine the meaning of words and phrases in a text relevant to a grade 2 topic or subject area",
                "Identify the main purpose of a text, including what the author wants to answer, explain, or describe",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 3,
              subGoals: [
                "Explain how specific images (e.g., a diagram showing how a machine works) contribute to and clarify a text",
                "Describe how reasons support specific points the author makes in a text",
                "Compare and contrast the most important points presented by two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 4,
              subGoals: [
                "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers",
                "Determine the main idea of a text; recount the key details and explain how they support the main idea",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 4,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words and phrases in a text relevant to a grade 3 topic or subject area",
                "Use text features and search tools (e.g., key words, sidebars, hyperlinks) to locate information relevant to a given topic efficiently",
                "Distinguish their own point of view from that of the author of a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 4,
              subGoals: [
                "Use information gained from illustrations (e.g., maps, photographs) and the words in a text to demonstrate understanding of the text (e.g., where, when, why, and how key events occur)",
                "Describe the logical connection between sentences and paragraphs in a text (e.g., comparison, cause/effect, first/second/third in a sequence)",
                "Compare and contrast the most important points and key details presented in two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 5,
              subGoals: [
                "Refer to details and examples in a text when explaining what the text says explicitly and when drawing inferences from the text",
                "Determine the main idea of a text and explain how it is supported by key details; summarize the text",
                "Explain events, procedures, ideas, or concepts in a historical, scientific, or technical text, including what happened and why, based on specific information in the text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 5,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words or phrases in a text relevant to a grade 4 topic or subject area",
                "Compare and contrast a firsthand and secondhand account of the same event or topic; describe the differences in focus and the information provided",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 5,
              subGoals: [
                "Explain how an author uses reasons and evidence to support points in a text",
                "Integrate information from two texts on the same topic to write or speak about the subject knowledgeably",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 6,
              subGoals: [
                "Quote accurately from a text when explaining what the text says explicitly and when drawing inferences from the text",
                "Determine two or more main ideas of a text and explain how they are supported by key details; summarize the text",
                "Explain the relationships or interactions between two or more individuals, events, ideas, or concepts in a historical, scientific, or technical text based on specific information in the text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 6,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words and phrases in a text relevant to a grade 5 topic or subject area",
                "Analyze multiple accounts of the same event or topic, noting important similarities and differences in the point of view they represent",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 6,
              subGoals: [
                "Draw on information from multiple print sources, demonstrating the ability to locate an answer to a question quickly or to solve a problem efficiently",
                "Explain how an author uses reasons and evidence to support points in a text, identifying which reasons and evidence support which point(s)",
                "Integrate information from several texts on the same topic to write or speak about the subject knowledgeably",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 7,
              subGoals: [
                "Cite textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine a central idea of a text and how it is conveyed through particular details; provide a summary of the text distinct from personal opinions or judgments",
                "Analyze in detail how a key individual, event, or idea is introduced, illustrated, and elaborated in a text (e.g., through examples or anecdotes)",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 7,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings",
                "Analyze how a particular sentence, paragraph, chapter, or section fits into the overall structure of a text and contributes to the development of the ideas",
                "Determine an author's point of view or purpose in a text and explain how it is conveyed in the text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 7,
              subGoals: [
                "Trace and evaluate the argument and specific claims in a text, distinguishing claims that are supported by reasons and evidence from claims that are not",
                "Compare and contrast one author's presentation of events with that of another",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 8,
              subGoals: [
                "Cite several pieces of textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine two or more central ideas in a text and analyze their development over the course of the text; provide an objective summary of the text",
                "Analyze the interactions between individuals, events, and ideas in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 8,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the impact of a specific word choice on meaning and tone",
                "Analyze the structure an author uses to organize a text, including how the major sections contribute to the whole and to the development of the ideas",
                "Determine an author's point of view or purpose in a text and analyze how the author distinguishes his or her position from that of others",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 8,
              subGoals: [
                "Trace and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and the evidence is relevant and sufficient to support the claims",
                "Analyze how two or more authors writing about the same topic shape their presentations of key information by emphasizing different evidence or advancing different interpretations of facts",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 9,
              subGoals: [
                "Cite the textual evidence that most strongly supports an analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine a central idea of a text and analyze its development over the course of the text, including its relationship to supporting ideas; provide an objective summary of the text",
                "Analyze how a text makes connections among and distinctions between individuals, ideas, or events",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 9,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the impact of specific word choices on meaning and tone, including analogies or allusions to other texts",
                "Analyze in detail the structure of a specific paragraph in a text, including the role of particular sentences in developing and refining a key concept",
                "Determine an author's point of view or purpose in a text and analyze how the author acknowledges and responds to conflicting evidence or viewpoints",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 9,
              subGoals: [
                "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and the evidence is relevant and sufficient; recognize when irrelevant evidence is introduced",
                "Analyze a case in which two or more texts provide conflicting information on the same topic and identify where the texts disagree on matters of fact or interpretation",
              ],
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 19,
          subTitle: "Struggles",
          description:
            "Select 3 smart goals and 3 goals per smart goal",
          question:
            "Which areas in reading comprehension does your student still struggle with?",
          select: "Accordian",
          dependQuestion: 2,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title: "Identifying key ideas and details:",
              level: 1,
              subGoals: [
                "Ask and answer questions about key details in a text with prompting and support",
                "Identify the main topic and retell key details of a text with prompting and support",
                "Describe the connection between two individuals, events, ideas, or pieces of information in a text, with prompting and support",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 1,
              subGoals: [
                "Ask and answer questions about unknown words in a text with prompting and support",
                "Identify the front cover, back cover, and title page of a book",
                "Name the author and illustrator of a text and define the role of each in presenting the ideas or information in a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 1,
              subGoals: [
                "Describe the relationship between illustrations and the text in which they appear (e.g., what person, place, thing, or idea in the text an illustration depicts), with prompting and support",
                "Identify the reasons an author gives to support points in a text, with prompting and support",
                "Name the author and illustrator of a text and define the role of each in presenting the ideas or information in a text",
                "Identify basic similarities in and differences between two texts on the same topic (e.g., in illustrations, descriptions, or procedures), with prompting and support",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 2,
              subGoals: [
                "Ask and answer questions about key details in a text",
                "Identify the main topic and retell key details of a text",
                "Describe the connection between two individuals, events, ideas, or pieces of information in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 2,
              subGoals: [
                "Ask and answer questions to help determine or clarify the meaning of words and phrases in a text",
                "Distinguish between information provided by pictures or other illustrations and information provided by the words in a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 2,
              subGoals: [
                "Use the illustrations and details in a text to describe its key ideas",
                "Identify the reasons an author gives to support points in a text",
                "Identify basic similarities in and differences between two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 3,
              subGoals: [
                "Ask and answer such questions as who, what, where, when, why, and how to demonstrate understanding of key details in a text",
                "Identify the main topic of a multi-paragraph text as well as the focus of specific paragraphs within the text",
                "Describe the connection between a series of historical events, scientific ideas or concepts, or steps in technical procedures in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 3,
              subGoals: [
                "Determine the meaning of words and phrases in a text relevant to a grade 2 topic or subject area",
                "Identify the main purpose of a text, including what the author wants to answer, explain, or describe",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 3,
              subGoals: [
                "Explain how specific images (e.g., a diagram showing how a machine works) contribute to and clarify a text",
                "Describe how reasons support specific points the author makes in a text",
                "Compare and contrast the most important points presented by two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 4,
              subGoals: [
                "Ask and answer questions to demonstrate understanding of a text, referring explicitly to the text as the basis for the answers",
                "Determine the main idea of a text; recount the key details and explain how they support the main idea",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 4,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words and phrases in a text relevant to a grade 3 topic or subject area",
                "Use text features and search tools (e.g., key words, sidebars, hyperlinks) to locate information relevant to a given topic efficiently",
                "Distinguish their own point of view from that of the author of a text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 4,
              subGoals: [
                "Use information gained from illustrations (e.g., maps, photographs) and the words in a text to demonstrate understanding of the text (e.g., where, when, why, and how key events occur)",
                "Describe the logical connection between sentences and paragraphs in a text (e.g., comparison, cause/effect, first/second/third in a sequence)",
                "Compare and contrast the most important points and key details presented in two texts on the same topic",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 5,
              subGoals: [
                "Refer to details and examples in a text when explaining what the text says explicitly and when drawing inferences from the text",
                "Determine the main idea of a text and explain how it is supported by key details; summarize the text",
                "Explain events, procedures, ideas, or concepts in a historical, scientific, or technical text, including what happened and why, based on specific information in the text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 5,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words or phrases in a text relevant to a grade 4 topic or subject area",
                "Compare and contrast a firsthand and secondhand account of the same event or topic; describe the differences in focus and the information provided",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 5,
              subGoals: [
                "Explain how an author uses reasons and evidence to support points in a text",
                "Integrate information from two texts on the same topic to write or speak about the subject knowledgeably",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 6,
              subGoals: [
                "Quote accurately from a text when explaining what the text says explicitly and when drawing inferences from the text",
                "Determine two or more main ideas of a text and explain how they are supported by key details; summarize the text",
                "Explain the relationships or interactions between two or more individuals, events, ideas, or concepts in a historical, scientific, or technical text based on specific information in the text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 6,
              subGoals: [
                "Determine the meaning of general academic and domain-specific words and phrases in a text relevant to a grade 5 topic or subject area",
                "Analyze multiple accounts of the same event or topic, noting important similarities and differences in the point of view they represent",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 6,
              subGoals: [
                "Draw on information from multiple print sources, demonstrating the ability to locate an answer to a question quickly or to solve a problem efficiently",
                "Explain how an author uses reasons and evidence to support points in a text, identifying which reasons and evidence support which point(s)",
                "Integrate information from several texts on the same topic to write or speak about the subject knowledgeably",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 7,
              subGoals: [
                "Cite textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine a central idea of a text and how it is conveyed through particular details; provide a summary of the text distinct from personal opinions or judgments",
                "Analyze in detail how a key individual, event, or idea is introduced, illustrated, and elaborated in a text (e.g., through examples or anecdotes)",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 7,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings",
                "Analyze how a particular sentence, paragraph, chapter, or section fits into the overall structure of a text and contributes to the development of the ideas",
                "Determine an author's point of view or purpose in a text and explain how it is conveyed in the text",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 7,
              subGoals: [
                "Trace and evaluate the argument and specific claims in a text, distinguishing claims that are supported by reasons and evidence from claims that are not",
                "Compare and contrast one author's presentation of events with that of another",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 8,
              subGoals: [
                "Cite several pieces of textual evidence to support analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine two or more central ideas in a text and analyze their development over the course of the text; provide an objective summary of the text",
                "Analyze the interactions between individuals, events, and ideas in a text",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 8,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the impact of a specific word choice on meaning and tone",
                "Analyze the structure an author uses to organize a text, including how the major sections contribute to the whole and to the development of the ideas",
                "Determine an author's point of view or purpose in a text and analyze how the author distinguishes his or her position from that of others",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 8,
              subGoals: [
                "Trace and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and the evidence is relevant and sufficient to support the claims",
                "Analyze how two or more authors writing about the same topic shape their presentations of key information by emphasizing different evidence or advancing different interpretations of facts",
              ],
            },
            {
              title: "Identifying key ideas and details:",
              level: 9,
              subGoals: [
                "Cite the textual evidence that most strongly supports an analysis of what the text says explicitly as well as inferences drawn from the text",
                "Determine a central idea of a text and analyze its development over the course of the text, including its relationship to supporting ideas; provide an objective summary of the text",
                "Analyze how a text makes connections among and distinctions between individuals, ideas, or events",
              ],
            },
            {
              title: "Demonstrating understanding of craft and structure:",
              level: 9,
              subGoals: [
                "Determine the meaning of words and phrases as they are used in a text, including figurative, connotative, and technical meanings; analyze the impact of specific word choices on meaning and tone, including analogies or allusions to other texts",
                "Analyze in detail the structure of a specific paragraph in a text, including the role of particular sentences in developing and refining a key concept",
                "Determine an author's point of view or purpose in a text and analyze how the author acknowledges and responds to conflicting evidence or viewpoints",
              ],
            },
            {
              title: "Integrating knowledge and ideas:",
              level: 9,
              subGoals: [
                "Delineate and evaluate the argument and specific claims in a text, assessing whether the reasoning is sound and the evidence is relevant and sufficient; recognize when irrelevant evidence is introduced",
                "Analyze a case in which two or more texts provide conflicting information on the same topic and identify where the texts disagree on matters of fact or interpretation",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Math",
      questions: [
        {
          isUpdated: false,
          questionID: 20,
          subTitle: "Math Skills",
          description: "Select 1",
          question: "How would you rate name's math skills?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "very poor",
              check: false,
            },
            {
              id: 2,
              value: "poor",
              check: false,
            },
            {
              id: 3,
              value: "slightly below expected grade level",
              check: false,
            },
            {
              id: 3,
              value: "at expected grade level",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 21,
          subTitle: "Grade Level",
          description: "Select 1",
          question: "Select the grade level from the following",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "Kindergarten",
              check: false,
              isHidden: false,
              level: 1,
            },
            {
              id: 2,
              value: "First Grade",
              check: false,
              isHidden: false,
              level: 2,
            },
            {
              id: 3,
              value: "Second Grade",
              check: false,
              isHidden: false,
              level: 3,
            },
            {
              id: 3,
              value: "Third Grade",
              check: false,
              isHidden: false,
              level: 4,
            },
            {
              id: 3,
              value: "Fourth Grade",
              check: false,
              isHidden: false,
              level: 5,
            },
            {
              id: 3,
              value: "Fifth Grade",
              check: false,
              isHidden: false,
              level: 6,
            },
            {
              id: 3,
              value: "Sixth Grade",
              check: false,
              isHidden: false,
              level: 7,
            },
            {
              id: 3,
              value: "Seventh Grade",
              check: false,
              isHidden: false,
              level: 8,
            },
            {
              id: 3,
              value: "Eighth Grade",
              check: false,
              isHidden: false,
              level: 9,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 22,
          subTitle: "Intervention",
          description: "Select 1",
          question: "Which type of aids do you use during intervention?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "visual aids",
              check: false,
            },
            {
              id: 2,
              value: "tactile manipulatives",
              check: false,
            },
            {
              id: 3,
              value: "base ten blocks",
              check: false,
            },
            {
              id: 3,
              value: "counters",
              check: false,
            },
            {
              id: 3,
              value: "hands-on techniques",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 23,
          subTitle: "Progress",
          description: "Select 1",
          question: "How would you describe name's progress in math?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "mild",
              check: false,
            },
            {
              id: 2,
              value: "moderate",
              check: false,
            },
            {
              id: 3,
              value: "significant",
              check: false,
            },
            {
              id: 3,
              value: "great",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 24,
          subTitle: "Math Goals",
          description:
            "select 3 smart goals and 1 goals per smart goal",
          question: "What are your math goals for the year?",
          select: "Accordian",
          answered: false,
          dependQuestion: 1,
          goalQues: [],
          suberGoals: [
            {
              title: "Know number names and the count sequence",
              level: 1,
              subGoals: [
                "Count to 100 by ones",
                "Count to 100 by tens",
                "Count forward beginning from a given number (instead of having to begin at 1)",
                "Write numbers from 0 to 20",
              ],
            },
            {
              title: "Count to tell the number of objects",
              level: 1,
              subGoals: [
                "Understand the relationship between numbers and quantities; connect counting to cardinality",
                "Demonstrate understanding of 1:1 correspondence, by saying the number names while pairing each object to one number name",
              ],
            },
            {
              title: "Compare numbers",
              level: 1,
              subGoals: [
                "Identify whether the number of objects in one group is greater than, less than, or equal to the number of objects in another group",
                "Compare two numbers between 1 and 10 presented as written numerals",
                "Understand addition as putting together and adding to and understand subtraction as taking apart and taking from",
                "Represent addition and subtraction with objects, fingers, mental images, drawings, and sounds",
                "Solve addition and subtraction word problems, and add and subtract within 10",
                "Find the number that makes 10 when added to the given number",
                "Fluently add and subtract within 5",
              ],
            },
            {
              title:
                "Work with numbers 11-19 to gain foundations for place value",
              level: 1,
              subGoals: [
                "Compose and decompose numbers from 11 to 19 into ten ones and some further ones",
              ],
            },
            {
              title: "Describe and compare measurable attributes",
              level: 1,
              subGoals: [
                "Describe measurable attributes of objects, such as length or weight",
                "Directly compare two objects with a measurable attribute in common, to see which object has 'more of'/'less of' the attribute and describe the difference",
              ],
            },
            {
              title: "Identify and describe shapes",
              level: 1,
              subGoals: [
                "Describe the relative positions of objects using terms such as above, below, beside, in front of, behind, and next to",
                "Correctly name shapes regardless of their orientations or overall size",
              ],
            },
            {
              title:
                "Represent and solve problems involving addition and subtraction",
              level: 2,
              subGoals: [
                "Solve word problems involving addition and subtraction within 20, with unknowns in all positions",
                "Solve word problems that call for addition of three whole numbers whose sum is less than or equal to 20",
              ],
            },
            {
              title: "Add and subtract within 20",
              level: 2,
              subGoals: [
                "Relate counting to addition and subtraction",
                "Add within 20",
                "Subtract within 20",
                "Demonstrate fluency for addition within 10",
                "Demonstrate fluency for subtraction within 10",
              ],
            },
            {
              title: "Extend the counting sequence",
              level: 2,
              subGoals: [
                "Count to 120, starting at any number less than 120",
                "Read and write numerals up to 120",
                "Represent a number of objects with a written numeral up to 120",
              ],
            },
            {
              title: "Understand place value",
              level: 2,
              subGoals: [
                "Understand that the two digits of a two-digit number represent amounts of tens and ones",
                "Compare two two-digit numbers based on meanings of the tens and ones digits, recording the results of comparisons with the symbols >, =, and <",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to add and subtract",
              level: 2,
              subGoals: [
                "Understand that in adding two-digit numbers, one adds tens and tens, ones and ones; and sometimes it is necessary to compose a ten",
                "Add a two-digit number and a one-digit number",
                "Mentally find 10 more or 10 less than a double-digit number, without having to count",
                "Subtract multiples of 10 in the range 10-90 from multiples of 10 in the range 10-90",
              ],
            },
            {
              title: "Measure lengths indirectly and by iterating length units",
              level: 2,
              subGoals: [
                "Order three objects by length",
                "Compare the lengths of two objects indirectly by using a third object",
              ],
            },
            {
              title: "Tell and write time",
              level: 2,
              subGoals: [
                "Label the hour hand and minute hand on an analog clock",
                "Tell time in hours using analog clocks",
                "Tell time in half hours and hours using analog clocks",
                "Write time in hours using analog and digital clocks",
                "Write time in half hours and hours using analog and digital clocks",
              ],
            },
            {
              title:
                "Represent and solve problems involving addition and subtraction",
              level: 3,
              subGoals: [
                "Use addition within 100 to solve one-step and two-step word problems involving situations including addition",
                "Use subtraction within 100 to solve one-step and two-step word problems involving situations including subtraction",
                "Use addition and subtraction within 100 to solve one and two-step word problems involving situations including addition and subtraction",
              ],
            },
            {
              title: "Add and subtract within 20",
              level: 3,
              subGoals: [
                "Fluently add within 20 using mental strategies",
                "Fluently subtract within 20 using mental strategies",
                "Know from memory all sums of two one-digit numbers",
              ],
            },
            {
              title:
                "Work with equal groups of objects to gain foundations for multiplication",
              level: 3,
              subGoals: [
                "Determine whether a group of objects (up to 20) has an odd or even number of members",
                "Use addition to find the total number of objects arranged in rectangular arrays with up to 5 rows and up to 5 columns",
                "Write an equation to express a total as a sum of equal addends",
              ],
            },
            {
              title: "Understand place value",
              level: 3,
              subGoals: [
                "Understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones",
                "Count within 1000",
                "Skip-count by 5s, 10s, and 100s",
                "Read and write numbers to 1000 using base-ten numerals, number names, and expanded form",
                "Compare two three-digit numbers based on meanings of the hundreds, tens, and ones digits, using >, =, and < symbols to record the results of comparisons",
              ],
            },
            {
              title: "Use properties of operations to add and subtract",
              level: 3,
              subGoals: [
                "Understand that in adding or subtracting three-digit numbers, one adds or subtracts hundreds and hundreds, tens and tens, ones and ones; and sometimes it is necessary to compose or decompose tens or hundreds",
                "Regroup in addition",
                "Regroup in subtraction",
                "Fluently add and subtract within 100",
                "Add up to four two-digit numbers",
                "Add and subtract within 1000",
                "Mentally add 10 or 100 to a given number 100-900",
                "Mentally subtract 10 or 100 from a given number 100-900",
              ],
            },
            {
              title: "Measure and estimate lengths in standard units",
              level: 3,
              subGoals: [
                "Measure the length of an object by selecting and using appropriate tools such as rulers, yardsticks, meter sticks, and measuring tapes",
                "Measure to determine how much longer one object is than another, expressing the length difference in terms of a standard length unit",
              ],
            },
            {
              title: "Relate addition and subtraction to length",
              level: 3,
              subGoals: [
                "Use addition and subtraction within 100 to solve word problems involving lengths that are given in the same units",
              ],
            },
            {
              title: "Work with time and money",
              level: 3,
              subGoals: [
                "Tell time to the hour on an analog clock",
                "Tell time to the half hour on an analog clock",
                "Tell time to the quarter on an analog clock",
                "Tell time to the nearest five minutes on an analog clock",
                "Label pennies, nickels, dimes and quarters",
                "Identify the value of pennies, nickels, dimes and quarters",
                "Add the value of a sum of pennies up to one dollar",
                "Add the value of a sum of nickels up to one dollar",
                "Add the value of a sum of dimes up to one dollar",
                "Add the value of a sum of quarters up to one dollar",
                "Add the value of a sum of coins, including pennies, nickels, dimes and quarters up to one dollar",
                "Add dollar bills accurately",
                "Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies, using $ and ¢ symbols appropriately",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 3,
              subGoals: [
                "Draw a picture graph and a bar graph (with single-unit scale) to represent a data set with up to four categories",
                "Solve simple put-together, take-apart, and compare problems using information presented in a bar graph",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to perform multi-digit arithmetic",
              level: 4,
              subGoals: [
                "Use place value understanding to round whole numbers to the nearest 10 or 100",
                "Fluently add and subtract within 1000",
                "Multiply one-digit whole numbers by multiples of 10 in the range 10-90 (e.g., 9 × 80, 5 × 60)",
              ],
            },
            {
              title:
                "Represent and solve problems involving multiplication and division",
              level: 4,
              subGoals: [
                "Demonstrate understanding of multiplication as repeated addition",
                "Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each",
                "Use multiplication within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities",
                "Determine the unknown whole number in a multiplication or division equation relating three whole numbers",
                "Demonstrate understanding of division as a number divided into equal groups",
              ],
            },
            {
              title: "Multiply and divide within 100",
              level: 4,
              subGoals: [
                "Multiply a one-digit number by 0",
                "Multiply a one-digit number by 1",
                "Multiply a one-digit number by 2",
                "Multiply a one-digit number by 3",
                "Multiply a one-digit number by 4",
                "Multiply a one-digit number by 5",
                "Multiply a one-digit number by 6",
                "Multiply a one-digit number by 7",
                "Multiply a one-digit number by 8",
                "Multiply a one-digit number by 9",
                "Multiply a one-digit number by 10",
                "Fluently multiply within 100",
                "Know from memory all products of two one-digit numbers",
                "Determine the quotients when a two-digit number is divided by 1",
                "Determine the quotients when a two-digit number is divided by 2",
                "Determine the quotients when a two-digit number is divided by 3",
                "Determine the quotients when a two-digit number is divided by 4",
                "Determine the quotients when a two-digit number is divided by 5",
                "Determine the quotients when a two-digit number is divided by 6",
                "Determine the quotients when a two-digit number is divided by 7",
                "Determine the quotients when a two-digit number is divided by 8",
                "Determine the quotients when a two-digit number is divided by 9",
                "Determine the quotients when a two-digit number is divided by 10",
              ],
            },
            {
              title: "Solve problems involving the four operations",
              level: 4,
              subGoals: [
                "Solve two-step word problems using addition, subtraction, and multiplication operations",
              ],
            },
            {
              title: "Develop understanding of fractions as numbers",
              level: 4,
              subGoals: [
                "Understand a fraction as a part over whole",
                "Understand a fraction as a number on the number line",
                "Represent fractions on a number line diagram",
                "Compare fractions by reasoning about their size",
                "Understand two fractions as equivalent (equal) if they are the same size, or the same point on a number line",
                "Generate simple equivalent fractions, such as ½ equals 2/4",
                "Write a fraction to represent a picture",
              ],
            },
            {
              title: "Work with time",
              level: 4,
              subGoals: [
                "Tell and write time to the nearest minute",
                "Solve word problems involving addition and subtraction of time intervals in minutes",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 4,
              subGoals: [
                "Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories",
                "Solve one- and two-step 'how many more' and 'how many less' problems using information presented in scaled bar graphs",
              ],
            },
            {
              title:
                "Use the four operations with whole numbers to solve problems",
              level: 5,
              subGoals: [
                "Solve multistep word problems using the four operations",
              ],
            },
            {
              title: "Gain familiarity with factors and multiples",
              level: 5,
              subGoals: [
                "Find all factor pairs for a whole number in the range 1-100",
                "Determine whether a given whole number in the range 1-100 is a multiple of a given one-digit number",
                "Determine whether a given whole number in the range 1-100 is prime or composite",
              ],
            },
            {
              title:
                "Generalize place value understanding for multi-digit whole numbers",
              level: 5,
              subGoals: [
                "Recognize that in a multi-digit whole number, a digit in one place represents ten times what it represents in the place to its right",
                "Read and write multi-digit whole numbers using base-ten numerals, number names, and expanded form",
                "Compare two multi-digit numbers based on meanings of the digits in each place, using >, =, and < symbols to record the results of comparisons",
                "Use place value understanding to round multi-digit whole numbers to any place",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to perform multi-digit arithmetic",
              level: 5,
              subGoals: [
                "Multiply a whole number of up to four digits by a one-digit whole number",
                "Multiply two two-digit numbers with or without regrouping",
                "Find whole-number quotients and remainders with up to four-digit dividends and one-digit divisors",
              ],
            },
            {
              title: "Build fractions from unit fractions",
              level: 5,
              subGoals: [
                "Understand addition and subtraction of fractions as joining and separating parts referring to the same whole",
                "Add and subtract mixed numbers with like denominators",
                "Solve word problems involving addition and subtraction of fractions",
                "Multiply a fraction by a whole number",
                "Solve word problems involving multiplication of a fraction by a whole number",
              ],
            },
            {
              title:
                "Understand decimal notation for fractions and compare decimal fractions",
              level: 5,
              subGoals: [
                "Add two fractions with denominators 10 and 100",
                "Use decimal notation for fractions with denominators 10 or 100",
                "Compare two decimals to hundredths by reasoning about their size",
              ],
            },
            {
              title:
                "Solve problems involving measurement and conversion of measurements",
              level: 5,
              subGoals: [
                "Know relative sizes of measurement units within one system of units including km, m, cm; kg, g; lb, oz.; l, ml; hr, min, sec.",
                "Within a single system of measurement, express measurements in a larger unit in terms of a smaller unit",
                "Use the four operations to solve word problems involving distances, intervals of time, liquid volumes, masses of objects, and money",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 5,
              subGoals: [
                "Make a line plot to display a data set of measurements in fractions of a unit (1/2, 1/4, 1/8)",
                "Solve problems involving addition and subtraction of fractions by using information presented in line plots",
              ],
            },
            {
              title: "Write and interpret numerical expressions",
              level: 6,
              subGoals: [
                "Follow the order of operations when solving multi-step equations",
              ],
            },
            {
              title: "Understand the place value system",
              level: 6,
              subGoals: [
                "Read, write, and compare decimals to thousandths",
                "Read and write decimals to thousandths using base-ten numerals, number names, and expanded form",
                "Compare two decimals to thousandths based on meanings of the digits in each place, using >, =, and < symbols to record the results of comparisons",
                "Use place value understanding to round decimals to any place",
              ],
            },
            {
              title:
                "Perform operations with multi-digit whole numbers and with decimals to hundredths",
              level: 6,
              subGoals: [
                "Fluently multiply multi-digit whole numbers using the standard algorithm",
                "Divide multi-digit numbers by two-digit divisors",
                "Use place value understanding to round decimals to any place",
              ],
            },
            {
              title: "Add and subtract fractions",
              level: 6,
              subGoals: [
                "Add and subtract fractions with unlike denominators",
                "Solve word problems involving addition and subtraction of fractions",
              ],
            },
            {
              title: "Multiply and divide fractions",
              level: 6,
              subGoals: [
                "Multiply a fraction or whole number by a fraction",
                "Solve real world problems involving multiplication of fractions and mixed numbers",
                "Divide fractions by whole numbers and whole numbers by fractions",
                "Solve real world problems involving division of fractions by whole numbers and division of whole numbers by fractions",
              ],
            },
            {
              title:
                "Convert like measurement units within a given measurement system",
              level: 6,
              subGoals: [
                "Convert among different-sized standard measurement units within a given measurement system",
                "Solve multi-step real world problems involving converting measurements units",
              ],
            },
            {
              title: "Geometric measurement: understand concepts of volume",
              level: 6,
              subGoals: [
                "Measure volumes by counting unit cubes, using cubic cm, cubic in, cubic ft, and improvised units",
                "Relate volume to the operations of multiplication and addition and solve real world and mathematical problems involving volume",
                "Find the volume of rectangular prisms using the formula V = l × w × h",
              ],
            },
            {
              title:
                "Understand ratio concepts and use ratio reasoning to solve problems",
              level: 7,
              subGoals: [
                "Demonstrate understanding of the concept of a ratio and use ratio language to describe a ratio relationship between two quantities",
                "Use ratio and rate reasoning to solve real-world and mathematical problems",
                "Identify equivalent ratios and find missing values in tables including ratios",
                "Solve unit rate problems",
                "Find a percent of a quantity as a rate per 100",
              ],
            },
            {
              title: "Divide fractions by fractions",
              level: 7,
              subGoals: [
                "Solve word problems involving division of fractions by fractions",
              ],
            },
            {
              title:
                "Compute fluently with multi-digit numbers and find common factors and multiples",
              level: 7,
              subGoals: [
                "Fluently divide multi-digit numbers using the standard algorithm",
                "Fluently add, subtract, multiply, and divide multi-digit decimals using the standard algorithm for each operation",
                "Find the greatest common factor of two whole numbers less than or equal to 100",
                "Find the least common multiple of two whole numbers less than or equal to 12",
              ],
            },
            {
              title: "Use arithmetic with rational numbers",
              level: 7,
              subGoals: [
                "Use positive and negative numbers to represent quantities in real-world contexts",
                "Recognize opposite signs of numbers as indicating locations on opposite sides of 0 on the number line",
                "Find and position integers and other rational numbers on a horizontal or vertical number line diagram",
                "Find and position pairs of integers and other rational numbers on a coordinate plane",
                "Write, interpret, and explain statements of order for rational numbers in real-world contexts",
                "Solve real-world and mathematical problems by graphing points in all four quadrants of the coordinate plane",
              ],
            },
            {
              title: "Demonstrate understanding of algebraic expressions",
              level: 7,
              subGoals: [
                "Write and evaluate numerical expressions involving exponents",
                "Write, read, and evaluate expressions including variables",
                "Write expressions that record operations with numbers and variable",
              ],
            },
            {
              title:
                "Reason about and solve one-variable equations and inequalities",
              level: 7,
              subGoals: [
                "Use variables to represent numbers and write expressions when solving a real-world or mathematical problem",
                "Solve real-world and mathematical problems by writing and solving single-step equations",
              ],
            },
            {
              title:
                "Solve real-world and mathematical problems involving area, surface area, and volume",
              level: 7,
              subGoals: [
                "Find the area of right triangles, other triangles, special quadrilaterals, and polygons",
                "Find the volume of a right rectangular prism with fractional edge lengths",
                "Draw polygons in the coordinate plane given coordinates for the vertices",
              ],
            },
            {
              title: "Summarize and describe distributions",
              level: 7,
              subGoals: [
                "Display numerical data in plots on a number line, including dot plots, histograms, and box plots",
                "Summarize numerical data sets in relation to their context",
              ],
            },
            {
              title:
                "Analyze proportional relationships and use them to solve real-world and mathematical problems",
              level: 8,
              subGoals: [
                "Compute unit rates associated with ratios of fractions",
                "Recognize and represent proportional relationships between quantities",
                "Decide whether two quantities are in a proportional relationship",
                "Identify the constant of proportionality (unit rate) in tables, graphs, equations, diagrams, and verbal descriptions of proportional relationships",
                "Represent proportional relationships by equations",
                "Use proportional relationships to solve multistep ratio and percent problems",
              ],
            },
            {
              title: "Demonstrate use of operations with fractions",
              level: 8,
              subGoals: [
                "Add and subtract rational numbers",
                "Multiply and divide rational numbers",
                "Convert a rational number to a decimal using long division",
                "Solve real-world and mathematical problems involving the four operations with rational numbers",
              ],
            },
            {
              title: "Generate equivalent expressions",
              level: 8,
              subGoals: [
                "Add, subtract, factor, and expand linear expressions with rational coefficients",
              ],
            },
            {
              title:
                "Solve real-life and mathematical problems using numerical and algebraic expressions and equations",
              level: 8,
              subGoals: [
                "Solve multi-step real-life and mathematical problems posed with positive and negative rational numbers",
                "Use variables to represent quantities in a real-world or mathematical problem and construct simple equations and inequalities to solve problems",
                "Solve word problems leading to equations of the form px + q = r and p(x + q) = r, where p, q, and r are specific rational numbers",
                "Solve word problems leading to inequalities of the form px + q > r or px + q < r, where p, q, and r are specific rational numbers",
              ],
            },
            {
              title:
                "Solve real-life and mathematical problems involving angle measure, area, surface area, and volume",
              level: 8,
              subGoals: [
                "Solve problems involving using formulas for the area and circumference of a circle",
                "Write and solve simple equations for an unknown angle in a figure",
                "Solve real-world and mathematical problems involving area, volume and surface area of two- and three-dimensional objects",
              ],
            },
            {
              title:
                "Use random sampling to draw inferences about a population",
              level: 8,
              subGoals: [
                "Use data from a random sample to draw inferences about a population with an unknown characteristic of interest",
              ],
            },
            {
              title:
                "Draw informal comparative inferences about two populations",
              level: 8,
              subGoals: [
                "Informally assess the degree of visual overlap of two numerical data distributions with similar variabilities",
                "Use measures of center and measures of variability for numerical data from random samples to draw informal comparative inferences about two populations",
              ],
            },
            {
              title:
                "Investigate chance processes and develop, use, and evaluate probability models",
              level: 8,
              subGoals: [
                "Develop a probability model and use it to find probabilities of events",
                "Compare probabilities from a model to observed frequencies",
                "Develop a probability model by observing frequencies in data generated from a chance process",
                "Find probabilities of compound events using organized lists, tables, tree diagrams, and simulation",
              ],
            },
            {
              title: "Work with radicals and integer exponents",
              level: 9,
              subGoals: [
                "Know and apply the properties of integer exponents to generate equivalent numerical expressions",
                "Use square root and cube root symbols to represent solutions",
                "Evaluate square roots of small perfect squares and cube roots of small perfect cubes",
                "Use numbers expressed in the form of a single digit times an integer power of 10 to estimate quantities",
                "Perform operations with numbers expressed in scientific notation, including problems where both decimal and scientific notation are used",
              ],
            },
            {
              title:
                "Understand the connections between proportional relationships, lines, and linear equations",
              level: 9,
              subGoals: [
                "Graph proportional relationships, interpreting the unit rate as the slope of the graph",
                "Compare two different proportional relationships represented in different ways",
              ],
            },
            {
              title:
                "Analyze and solve linear equations and pairs of simultaneous linear equations",
              level: 9,
              subGoals: [
                "Solve linear equations in one variable",
                "Solve linear equations with rational number coefficients",
                "Solve systems of two linear equations in two variables algebraically",
                "Solve real-world and mathematical problems leading to two linear equations in two variables",
              ],
            },
            {
              title:
                "Use physical models and transparencies to understand congruence and similarity",
              level: 9,
              subGoals: [
                "Verify experimentally the properties of rotations, reflections, and translations",
                "Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates",
              ],
            },
            {
              title: "Apply the Pythagorean Theorem",
              level: 9,
              subGoals: [
                "Apply the Pythagorean Theorem to determine unknown side lengths in right triangles in real-world and mathematical problems in two and three dimensions",
                "Apply the Pythagorean Theorem to find the distance between two points in a coordinate system",
              ],
            },
            {
              title:
                "Solve real-world and mathematical problems involving volume of cylinders, cones, and spheres",
              level: 9,
              subGoals: [
                "Solve real-world and mathematical problems using formulas for the volumes of cones, cylinders, and spheres",
              ],
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 25,
          subTitle: "Struggles",
          description:
            "goals total select 3 smart goals and 1 goals per smart goal",
          question:
            "Which areas in math goals does your student still struggle with?",
          select: "Accordian",
          dependQuestion: 1,
          answered: false,
          goalQues: [],
          removeSuperGoals: [
            {
              hide: "Work with time and money",
              titles: [
                "Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies, using $ and ¢ symbols appropriately",
              ],
            },
            {
              hide: "Represent and solve problems involving multiplication and division",
              titles: [
                "Demonstrate understanding of division as a number divided into equal groups",
              ],
            },
            {
              hide: "Multiply and divide within 100",
              titles: [
                "Determine the quotients when a two-digit number is divided by 1",
                "Determine the quotients when a two-digit number is divided by 2",
                "Determine the quotients when a two-digit number is divided by 3",
                "Determine the quotients when a two-digit number is divided by 4",
                "Determine the quotients when a two-digit number is divided by 5",
                "Determine the quotients when a two-digit number is divided by 6",
                "Determine the quotients when a two-digit number is divided by 7",
                "Determine the quotients when a two-digit number is divided by 8",
                "Determine the quotients when a two-digit number is divided by 9",
                "Determine the quotients when a two-digit number is divided by 10",
              ],
            },
          ],
          suberGoals: [
            {
              title: "Know number names and the count sequence",
              level: 1,
              subGoals: [
                "Count to 100 by ones",
                "Count to 100 by tens",
                "Count forward beginning from a given number (instead of having to begin at 1)",
                "Write numbers from 0 to 20",
              ],
            },
            {
              title: "Count to tell the number of objects",
              level: 1,
              subGoals: [
                "Understand the relationship between numbers and quantities; connect counting to cardinality",
                "Demonstrate understanding of 1:1 correspondence, by saying the number names while pairing each object to one number name",
              ],
            },
            {
              title: "Compare numbers",
              level: 1,
              subGoals: [
                "Identify whether the number of objects in one group is greater than, less than, or equal to the number of objects in another group",
                "Compare two numbers between 1 and 10 presented as written numerals",
                "Understand addition as putting together and adding to and understand subtraction as taking apart and taking from",
                "Represent addition and subtraction with objects, fingers, mental images, drawings, and sounds",
                "Solve addition and subtraction word problems, and add and subtract within 10",
                "Find the number that makes 10 when added to the given number",
                "Fluently add and subtract within 5",
              ],
            },
            {
              title:
                "Work with numbers 11-19 to gain foundations for place value",
              level: 1,
              subGoals: [
                "Compose and decompose numbers from 11 to 19 into ten ones and some further ones",
              ],
            },
            {
              title: "Describe and compare measurable attributes",
              level: 1,
              subGoals: [
                "Describe measurable attributes of objects, such as length or weight",
                "Directly compare two objects with a measurable attribute in common, to see which object has 'more of'/'less of' the attribute and describe the difference",
              ],
            },
            {
              title: "Identify and describe shapes",
              level: 1,
              subGoals: [
                "Describe the relative positions of objects using terms such as above, below, beside, in front of, behind, and next to",
                "Correctly name shapes regardless of their orientations or overall size",
              ],
            },
            {
              title:
                "Represent and solve problems involving addition and subtraction",
              level: 2,
              subGoals: [
                "Solve word problems involving addition and subtraction within 20, with unknowns in all positions",
                "Solve word problems that call for addition of three whole numbers whose sum is less than or equal to 20",
              ],
            },
            {
              title: "Add and subtract within 20",
              level: 2,
              subGoals: [
                "Relate counting to addition and subtraction",
                "Add within 20",
                "Subtract within 20",
                "Demonstrate fluency for addition within 10",
                "Demonstrate fluency for subtraction within 10",
              ],
            },
            {
              title: "Extend the counting sequence",
              level: 2,
              subGoals: [
                "Count to 120, starting at any number less than 120",
                "Read and write numerals up to 120",
                "Represent a number of objects with a written numeral up to 120",
              ],
            },
            {
              title: "Understand place value",
              level: 2,
              subGoals: [
                "Understand that the two digits of a two-digit number represent amounts of tens and ones",
                "Compare two two-digit numbers based on meanings of the tens and ones digits, recording the results of comparisons with the symbols >, =, and <",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to add and subtract",
              level: 2,
              subGoals: [
                "Understand that in adding two-digit numbers, one adds tens and tens, ones and ones; and sometimes it is necessary to compose a ten",
                "Add a two-digit number and a one-digit number",
                "Mentally find 10 more or 10 less than a double-digit number, without having to count",
                "Subtract multiples of 10 in the range 10-90 from multiples of 10 in the range 10-90",
              ],
            },
            {
              title: "Measure lengths indirectly and by iterating length units",
              level: 2,
              subGoals: [
                "Order three objects by length",
                "Compare the lengths of two objects indirectly by using a third object",
              ],
            },
            {
              title: "Tell and write time",
              level: 2,
              subGoals: [
                "Label the hour hand and minute hand on an analog clock",
                "Tell time in hours using analog clocks",
                "Tell time in half hours and hours using analog clocks",
                "Write time in hours using analog and digital clocks",
                "Write time in half hours and hours using analog and digital clocks",
              ],
            },
            {
              title:
                "Represent and solve problems involving addition and subtraction",
              level: 3,
              subGoals: [
                "Use addition within 100 to solve one-step and two-step word problems involving situations including addition",
                "Use subtraction within 100 to solve one-step and two-step word problems involving situations including subtraction",
                "Use addition and subtraction within 100 to solve one and two-step word problems involving situations including addition and subtraction",
              ],
            },
            {
              title: "Add and subtract within 20",
              level: 3,
              subGoals: [
                "Fluently add within 20 using mental strategies",
                "Fluently subtract within 20 using mental strategies",
                "Know from memory all sums of two one-digit numbers",
              ],
            },
            {
              title:
                "Work with equal groups of objects to gain foundations for multiplication",
              level: 3,
              subGoals: [
                "Determine whether a group of objects (up to 20) has an odd or even number of members",
                "Use addition to find the total number of objects arranged in rectangular arrays with up to 5 rows and up to 5 columns",
                "Write an equation to express a total as a sum of equal addends",
              ],
            },
            {
              title: "Understand place value",
              level: 3,
              subGoals: [
                "Understand that the three digits of a three-digit number represent amounts of hundreds, tens, and ones",
                "Count within 1000",
                "Skip-count by 5s, 10s, and 100s",
                "Read and write numbers to 1000 using base-ten numerals, number names, and expanded form",
                "Compare two three-digit numbers based on meanings of the hundreds, tens, and ones digits, using >, =, and < symbols to record the results of comparisons",
              ],
            },
            {
              title: "Use properties of operations to add and subtract",
              level: 3,
              subGoals: [
                "Understand that in adding or subtracting three-digit numbers, one adds or subtracts hundreds and hundreds, tens and tens, ones and ones; and sometimes it is necessary to compose or decompose tens or hundreds",
                "Regroup in addition",
                "Regroup in subtraction",
                "Fluently add and subtract within 100",
                "Add up to four two-digit numbers",
                "Add and subtract within 1000",
                "Mentally add 10 or 100 to a given number 100-900",
                "Mentally subtract 10 or 100 from a given number 100-900",
              ],
            },
            {
              title: "Measure and estimate lengths in standard units",
              level: 3,
              subGoals: [
                "Measure the length of an object by selecting and using appropriate tools such as rulers, yardsticks, meter sticks, and measuring tapes",
                "Measure to determine how much longer one object is than another, expressing the length difference in terms of a standard length unit",
              ],
            },
            {
              title: "Relate addition and subtraction to length",
              level: 3,
              subGoals: [
                "Use addition and subtraction within 100 to solve word problems involving lengths that are given in the same units",
              ],
            },
            {
              title: "Work with time and money",
              level: 3,
              subGoals: [
                "Tell time to the hour on an analog clock",
                "Tell time to the half hour on an analog clock",
                "Tell time to the quarter on an analog clock",
                "Tell time to the nearest five minutes on an analog clock",
                "Label pennies, nickels, dimes and quarters",
                "Identify the value of pennies, nickels, dimes and quarters",
                "Add the value of a sum of pennies up to one dollar",
                "Add the value of a sum of nickels up to one dollar",
                "Add the value of a sum of dimes up to one dollar",
                "Add the value of a sum of quarters up to one dollar",
                "Add the value of a sum of coins, including pennies, nickels, dimes and quarters up to one dollar",
                "Add dollar bills accurately",
                "Solve word problems involving dollar bills, quarters, dimes, nickels, and pennies, using $ and ¢ symbols appropriately",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 3,
              subGoals: [
                "Draw a picture graph and a bar graph (with single-unit scale) to represent a data set with up to four categories",
                "Solve simple put-together, take-apart, and compare problems using information presented in a bar graph",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to perform multi-digit arithmetic",
              level: 4,
              subGoals: [
                "Use place value understanding to round whole numbers to the nearest 10 or 100",
                "Fluently add and subtract within 1000",
                "Multiply one-digit whole numbers by multiples of 10 in the range 10-90 (e.g., 9 × 80, 5 × 60)",
              ],
            },
            {
              title:
                "Represent and solve problems involving multiplication and division",
              level: 4,
              subGoals: [
                "Demonstrate understanding of multiplication as repeated addition",
                "Interpret products of whole numbers, e.g., interpret 5 × 7 as the total number of objects in 5 groups of 7 objects each",
                "Use multiplication within 100 to solve word problems in situations involving equal groups, arrays, and measurement quantities",
                "Determine the unknown whole number in a multiplication or division equation relating three whole numbers",
                "Demonstrate understanding of division as a number divided into equal groups",
              ],
            },
            {
              title: "Multiply and divide within 100",
              level: 4,
              subGoals: [
                "Multiply a one-digit number by 0",
                "Multiply a one-digit number by 1",
                "Multiply a one-digit number by 2",
                "Multiply a one-digit number by 3",
                "Multiply a one-digit number by 4",
                "Multiply a one-digit number by 5",
                "Multiply a one-digit number by 6",
                "Multiply a one-digit number by 7",
                "Multiply a one-digit number by 8",
                "Multiply a one-digit number by 9",
                "Multiply a one-digit number by 10",
                "Fluently multiply within 100",
                "Know from memory all products of two one-digit numbers",
                "Determine the quotients when a two-digit number is divided by 1",
                "Determine the quotients when a two-digit number is divided by 2",
                "Determine the quotients when a two-digit number is divided by 3",
                "Determine the quotients when a two-digit number is divided by 4",
                "Determine the quotients when a two-digit number is divided by 5",
                "Determine the quotients when a two-digit number is divided by 6",
                "Determine the quotients when a two-digit number is divided by 7",
                "Determine the quotients when a two-digit number is divided by 8",
                "Determine the quotients when a two-digit number is divided by 9",
                "Determine the quotients when a two-digit number is divided by 10",
              ],
            },
            {
              title: "Solve problems involving the four operations",
              level: 4,
              subGoals: [
                "Solve two-step word problems using addition, subtraction, and multiplication operations",
              ],
            },
            {
              title: "Develop understanding of fractions as numbers",
              level: 4,
              subGoals: [
                "Understand a fraction as a part over whole",
                "Understand a fraction as a number on the number line",
                "Represent fractions on a number line diagram",
                "Compare fractions by reasoning about their size",
                "Understand two fractions as equivalent (equal) if they are the same size, or the same point on a number line",
                "Generate simple equivalent fractions, such as ½ equals 2/4",
                "Write a fraction to represent a picture",
              ],
            },
            {
              title: "Work with time",
              level: 4,
              subGoals: [
                "Tell and write time to the nearest minute",
                "Solve word problems involving addition and subtraction of time intervals in minutes",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 4,
              subGoals: [
                "Draw a scaled picture graph and a scaled bar graph to represent a data set with several categories",
                "Solve one- and two-step 'how many more' and 'how many less' problems using information presented in scaled bar graphs",
              ],
            },
            {
              title:
                "Use the four operations with whole numbers to solve problems",
              level: 5,
              subGoals: [
                "Solve multistep word problems using the four operations",
              ],
            },
            {
              title: "Gain familiarity with factors and multiples",
              level: 5,
              subGoals: [
                "Find all factor pairs for a whole number in the range 1-100",
                "Determine whether a given whole number in the range 1-100 is a multiple of a given one-digit number",
                "Determine whether a given whole number in the range 1-100 is prime or composite",
              ],
            },
            {
              title:
                "Generalize place value understanding for multi-digit whole numbers",
              level: 5,
              subGoals: [
                "Recognize that in a multi-digit whole number, a digit in one place represents ten times what it represents in the place to its right",
                "Read and write multi-digit whole numbers using base-ten numerals, number names, and expanded form",
                "Compare two multi-digit numbers based on meanings of the digits in each place, using >, =, and < symbols to record the results of comparisons",
                "Use place value understanding to round multi-digit whole numbers to any place",
              ],
            },
            {
              title:
                "Use place value understanding and properties of operations to perform multi-digit arithmetic",
              level: 5,
              subGoals: [
                "Multiply a whole number of up to four digits by a one-digit whole number",
                "Multiply two two-digit numbers with or without regrouping",
                "Find whole-number quotients and remainders with up to four-digit dividends and one-digit divisors",
              ],
            },
            {
              title: "Build fractions from unit fractions",
              level: 5,
              subGoals: [
                "Understand addition and subtraction of fractions as joining and separating parts referring to the same whole",
                "Add and subtract mixed numbers with like denominators",
                "Solve word problems involving addition and subtraction of fractions",
                "Multiply a fraction by a whole number",
                "Solve word problems involving multiplication of a fraction by a whole number",
              ],
            },
            {
              title:
                "Understand decimal notation for fractions and compare decimal fractions",
              level: 5,
              subGoals: [
                "Add two fractions with denominators 10 and 100",
                "Use decimal notation for fractions with denominators 10 or 100",
                "Compare two decimals to hundredths by reasoning about their size",
              ],
            },
            {
              title:
                "Solve problems involving measurement and conversion of measurements",
              level: 5,
              subGoals: [
                "Know relative sizes of measurement units within one system of units including km, m, cm; kg, g; lb, oz.; l, ml; hr, min, sec",
                "Within a single system of measurement, express measurements in a larger unit in terms of a smaller unit",
                "Use the four operations to solve word problems involving distances, intervals of time, liquid volumes, masses of objects, and money",
              ],
            },
            {
              title: "Represent and interpret data",
              level: 5,
              subGoals: [
                "Make a line plot to display a data set of measurements in fractions of a unit (1/2, 1/4, 1/8)",
                "Solve problems involving addition and subtraction of fractions by using information presented in line plots",
              ],
            },
            {
              title: "Write and interpret numerical expressions",
              level: 6,
              subGoals: [
                "Follow the order of operations when solving multi-step equations",
              ],
            },
            {
              title: "Understand the place value system",
              level: 6,
              subGoals: [
                "Read, write, and compare decimals to thousandths",
                "Read and write decimals to thousandths using base-ten numerals, number names, and expanded form",
                "Compare two decimals to thousandths based on meanings of the digits in each place, using >, =, and < symbols to record the results of comparisons",
                "Use place value understanding to round decimals to any place",
              ],
            },
            {
              title:
                "Perform operations with multi-digit whole numbers and with decimals to hundredths",
              level: 6,
              subGoals: [
                "Fluently multiply multi-digit whole numbers using the standard algorithm",
                "Divide multi-digit numbers by two-digit divisors",
                "Use place value understanding to round decimals to any place",
              ],
            },
            {
              title: "Add and subtract fractions",
              level: 6,
              subGoals: [
                "Add and subtract fractions with unlike denominators",
                "Solve word problems involving addition and subtraction of fractions",
              ],
            },
            {
              title: "Multiply and divide fractions",
              level: 6,
              subGoals: [
                "Multiply a fraction or whole number by a fraction",
                "Solve real world problems involving multiplication of fractions and mixed numbers",
                "Divide fractions by whole numbers and whole numbers by fractions",
                "Solve real world problems involving division of fractions by whole numbers and division of whole numbers by fractions",
              ],
            },
            {
              title:
                "Convert like measurement units within a given measurement system",
              level: 6,
              subGoals: [
                "Convert among different-sized standard measurement units within a given measurement system",
                "Solve multi-step real world problems involving converting measurements units",
              ],
            },
            {
              title: "Geometric measurement: understand concepts of volume",
              level: 6,
              subGoals: [
                "Measure volumes by counting unit cubes, using cubic cm, cubic in, cubic ft, and improvised units",
                "Relate volume to the operations of multiplication and addition and solve real world and mathematical problems involving volume",
                "Find the volume of rectangular prisms using the formula V = l × w × h",
              ],
            },
            {
              title:
                "Understand ratio concepts and use ratio reasoning to solve problems",
              level: 7,
              subGoals: [
                "Demonstrate understanding of the concept of a ratio and use ratio language to describe a ratio relationship between two quantities",
                "Use ratio and rate reasoning to solve real-world and mathematical problems",
                "Identify equivalent ratios and find missing values in tables including ratios",
                "Solve unit rate problems",
                "Find a percent of a quantity as a rate per 100",
              ],
            },
            {
              title: "Divide fractions by fractions",
              level: 7,
              subGoals: [
                "Solve word problems involving division of fractions by fractions",
              ],
            },
            {
              title:
                "Compute fluently with multi-digit numbers and find common factors and multiples",
              level: 7,
              subGoals: [
                "Fluently divide multi-digit numbers using the standard algorithm",
                "Fluently add, subtract, multiply, and divide multi-digit decimals using the standard algorithm for each operation",
                "Find the greatest common factor of two whole numbers less than or equal to 100",
                "Find the least common multiple of two whole numbers less than or equal to 12",
              ],
            },
            {
              title: "Use arithmetic with rational numbers",
              level: 7,
              subGoals: [
                "Use positive and negative numbers to represent quantities in real-world contexts",
                "Recognize opposite signs of numbers as indicating locations on opposite sides of 0 on the number line",
                "Find and position integers and other rational numbers on a horizontal or vertical number line diagram",
                "Find and position pairs of integers and other rational numbers on a coordinate plane",
                "Write, interpret, and explain statements of order for rational numbers in real-world contexts",
                "Solve real-world and mathematical problems by graphing points in all four quadrants of the coordinate plane",
              ],
            },
            {
              title: "Demonstrate understanding of algebraic expressions",
              level: 7,
              subGoals: [
                "Write and evaluate numerical expressions involving exponents",
                "Write, read, and evaluate expressions including variables",
                "Write expressions that record operations with numbers and variable",
              ],
            },
            {
              title:
                "Reason about and solve one-variable equations and inequalities",
              level: 7,
              subGoals: [
                "Use variables to represent numbers and write expressions when solving a real-world or mathematical problem",
                "Solve real-world and mathematical problems by writing and solving single-step equations",
              ],
            },
            {
              title:
                "Solve real-world and mathematical problems involving area, surface area, and volume",
              level: 7,
              subGoals: [
                "Find the area of right triangles, other triangles, special quadrilaterals, and polygons",
                "Find the volume of a right rectangular prism with fractional edge lengths",
                "Draw polygons in the coordinate plane given coordinates for the vertices",
              ],
            },
            {
              title: "Summarize and describe distributions",
              level: 7,
              subGoals: [
                "Display numerical data in plots on a number line, including dot plots, histograms, and box plots",
                "Summarize numerical data sets in relation to their context",
              ],
            },
            {
              title:
                "Analyze proportional relationships and use them to solve real-world and mathematical problems",
              level: 8,
              subGoals: [
                "Compute unit rates associated with ratios of fractions",
                "Recognize and represent proportional relationships between quantities",
                "Decide whether two quantities are in a proportional relationship",
                "Identify the constant of proportionality (unit rate) in tables, graphs, equations, diagrams, and verbal descriptions of proportional relationships",
                "Represent proportional relationships by equations",
                "Use proportional relationships to solve multistep ratio and percent problems",
              ],
            },
            {
              title: "Demonstrate use of operations with fractions",
              level: 8,
              subGoals: [
                "Add and subtract rational numbers",
                "Multiply and divide rational numbers",
                "Convert a rational number to a decimal using long division",
                "Solve real-world and mathematical problems involving the four operations with rational numbers",
              ],
            },
            {
              title: "Generate equivalent expressions",
              level: 8,
              subGoals: [
                "Add, subtract, factor, and expand linear expressions with rational coefficients",
              ],
            },
            {
              title:
                "Solve real-life and mathematical problems using numerical and algebraic expressions and equations",
              level: 8,
              subGoals: [
                "Solve multi-step real-life and mathematical problems posed with positive and negative rational numbers",
                "Use variables to represent quantities in a real-world or mathematical problem and construct simple equations and inequalities to solve problems",
                "Solve word problems leading to equations of the form px + q = r and p(x + q) = r, where p, q, and r are specific rational numbers",
                "Solve word problems leading to inequalities of the form px + q > r or px + q < r, where p, q, and r are specific rational numbers",
              ],
            },
            {
              title:
                "Solve real-life and mathematical problems involving angle measure, area, surface area, and volume",
              level: 8,
              subGoals: [
                "Solve problems involving using formulas for the area and circumference of a circle",
                "Write and solve simple equations for an unknown angle in a figure",
                "Solve real-world and mathematical problems involving area, volume and surface area of two- and three-dimensional objects",
              ],
            },
            {
              title:
                "Use random sampling to draw inferences about a population",
              level: 8,
              subGoals: [
                "Use data from a random sample to draw inferences about a population with an unknown characteristic of interest",
              ],
            },
            {
              title:
                "Draw informal comparative inferences about two populations",
              level: 8,
              subGoals: [
                "Informally assess the degree of visual overlap of two numerical data distributions with similar variabilities",
                "Use measures of center and measures of variability for numerical data from random samples to draw informal comparative inferences about two populations",
              ],
            },
            {
              title:
                "Investigate chance processes and develop, use, and evaluate probability models",
              level: 8,
              subGoals: [
                "Develop a probability model and use it to find probabilities of events",
                "Compare probabilities from a model to observed frequencies",
                "Develop a probability model by observing frequencies in data generated from a chance process",
                "Find probabilities of compound events using organized lists, tables, tree diagrams, and simulation",
              ],
            },
            {
              title: "Work with radicals and integer exponents",
              level: 9,
              subGoals: [
                "Know and apply the properties of integer exponents to generate equivalent numerical expressions",
                "Use square root and cube root symbols to represent solutions",
                "Evaluate square roots of small perfect squares and cube roots of small perfect cubes",
                "Use numbers expressed in the form of a single digit times an integer power of 10 to estimate quantities",
                "Perform operations with numbers expressed in scientific notation, including problems where both decimal and scientific notation are used",
              ],
            },
            {
              title:
                "Understand the connections between proportional relationships, lines, and linear equations",
              level: 9,
              subGoals: [
                "Graph proportional relationships, interpreting the unit rate as the slope of the graph",
                "Compare two different proportional relationships represented in different ways",
              ],
            },
            {
              title:
                "Analyze and solve linear equations and pairs of simultaneous linear equations",
              level: 9,
              subGoals: [
                "Solve linear equations in one variable",
                "Solve linear equations with rational number coefficients",
                "Solve systems of two linear equations in two variables algebraically",
                "Solve real-world and mathematical problems leading to two linear equations in two variables",
              ],
            },
            {
              title:
                "Use physical models and transparencies to understand congruence and similarity",
              level: 9,
              subGoals: [
                "Verify experimentally the properties of rotations, reflections, and translations",
                "Describe the effect of dilations, translations, rotations, and reflections on two-dimensional figures using coordinates",
              ],
            },
            {
              title: "Apply the Pythagorean Theorem",
              level: 9,
              subGoals: [
                "Apply the Pythagorean Theorem to determine unknown side lengths in right triangles in real-world and mathematical problems in two and three dimensions",
                "Apply the Pythagorean Theorem to find the distance between two points in a coordinate system",
              ],
            },
            {
              title:
                "Solve real-world and mathematical problems involving volume of cylinders, cones, and spheres",
              level: 9,
              subGoals: [
                "Solve real-world and mathematical problems using formulas for the volumes of cones, cylinders, and spheres",
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Speech and Language",
      questions: [
        {
          isUpdated: false,
          questionID: 26,
          subTitle: "SLP Services",
          question: "Does name receive SLP (Speech Therapy) services?",
          description: "Select 1",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "Not sure",
              check: false,
            },
            {
              id: 2,
              value: "Yes",
              check: false,
            },
            {
              id: 3,
              value: "No",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 27,
          subTitle: "Beneficial",
          question:
            "Do you think your student would benefit from SLP services?",
          description: "Select 1",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 2,
              value: "Yes",
              check: false,
            },
            {
              id: 3,
              value: "No",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 28,
          subTitle: "Frequency",
          question:
            "How many times a week does name receive SLP services?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          description: "Select 1",
          answered: false,
          options: [
            {
              id: 2,
              value: "One thirty minute session per week of SLP servicess",
              check: false,
            },
            {
              id: 3,
              value: "Two thirty minute sessions per week of SLP services",
              check: false,
            },
            {
              id: 3,
              value: "Three thirty minute sessions per week of SLP services",
              check: false,
            },
            {
              id: 3,
              value: "One hour session per week of SLP services",
              check: false,
            },
            {
              id: 3,
              value: "Two one-hour sessions per week of SLP services",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 29,
          subTitle: "Skills",
          question: "Which of these is name able to do?",
          select: "Multi",
          description: "select 2",
          answered: false,
          min: 1,
          max: 2,
          limit: false,
          options: [
            {
              id: 1,
              value: "use appropriate gestures",
              check: false,
              doHide: [0],
            },
            {
              id: 2,
              value: "use appropriate facial expressions",
              check: false,
              doHide: [1],
            },
            {
              id: 3,
              value: "name objects correctly",
              check: false,
              doHide: [2],
            },
            {
              id: 3,
              value: "express P3 needs and wants",
              check: false,
              doHide: [3],
            },
            {
              id: 3,
              value: "ask questions",
              check: false,
              doHide: [4],
            },
            {
              id: 3,
              value: "answer yes and no questions",
              check: false,
              doHide: [5],
            },
            {
              id: 3,
              value: "answer 'wh' questions",
              check: false,
              doHide: [6],
            },
            {
              id: 3,
              value: "answer 'why' questions",
              check: false,
              doHide: [7],
            },
            {
              id: 3,
              value: "speak in full sentences",
              check: false,
              doHide: [8],
            },
            {
              id: 3,
              value: "write full sentences properly",
              check: false,
              doHide: [9],
            },
            {
              id: 3,
              value: "use correct grammar in speech",
              check: false,
              doHide: [10],
            },
            {
              id: 3,
              value: "use correct grammar in writing",
              check: false,
              doHide: [11],
            },
            {
              id: 3,
              value: "retell stories or events",
              check: false,
              doHide: [12],
            },
            {
              id: 3,
              value: "maintain a conversation with multiple exchanges",
              check: false,
              doHide: [13],
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 30,
          subTitle: "Struggles",
          question: "Which of these does name struggle with?",
          select: "Multi",
          description: "Select 2 to many",
          answered: false,
          min: 2,
          max: 14,
          limit: false,
          options: [
            {
              id: 1,
              value: "using appropriate gestures",
              check: false,
              isHidden: false,
            },
            {
              id: 2,
              value: "using appropriate facial expressions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "naming objects correctly",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "expressing needs and wants",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "asking questions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "answering yes and no question",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "answering 'wh' questions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "answering 'why' questions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "speaking in full sentences",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "writing full sentences properly",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "using correct grammar in speech",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "using correct grammar in text",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "retelling stories or events",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "maintaining a conversation with multiple exchanges",
              check: false,
              isHidden: false,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 31,
          subTitle: "Strength",
          question: "Which of these is name’s strength?",
          select: "Multi",
          description: "Select 1 to 3",
          answered: false,
          min: 1,
          max: 3,
          limit: false,
          options: [
            {
              id: 1,
              value: "perceiving others’ emotions",
              check: false,
              doHide: [0],
            },
            {
              id: 2,
              value: "following single-step directions",
              check: false,
              doHide: [1],
            },
            {
              id: 3,
              value: "following multi-step directions",
              check: false,
              doHide: [1, 2],
            },
            {
              id: 3,
              value: "learning new words",
              check: false,
              doHide: [3],
            },
            {
              id: 3,
              value: "understanding new concepts and ideas",
              check: false,
              doHide: [4],
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 32,
          subTitle: "Weakness",
          question: "Which of these is your name's weakness? ",
          select: "Multi",
          description: "Select 1 to 3",
          answered: false,
          min: 1,
          max: 3,
          limit: false,
          options: [
            {
              id: 1,
              value: "perceiving others’ emotions",
              check: false,
              isHidden: false,
            },
            {
              id: 2,
              value: "following single-step directions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "following multi-step directions",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "learning new words",
              check: false,
              isHidden: false,
            },
            {
              id: 3,
              value: "understanding new concepts and ideas",
              check: false,
              isHidden: false,
            },
          ],
        },
      ],
    },
    { 
      id: 3,
      title: "Social-emotional",
      questions: [
        {
          isUpdated: false,
          questionID: 33,
          subTitle: "Delays",
          question:
            "In which areas does name display delays?",
          select: "Multi",
          description: "Select 1 to 3",
          min: 1,
          max: 3,
          limit: false,
          answered: false,
          options: [
            {
              id: 1,
              value: "compliance",
              check: false,
              level: 1,
            },
            {
              id: 2,
              value: "emotional regulation",
              check: false,
              level: 2,
            },
            {
              id: 3,
              value: "social skills",
              check: false,
              level: 3,
            },
            {
              id: 3,
              value: "none",
              check: false,
              level: 0,
            },
          ],
        },
        {
          isUpdated: false,
          questionID: 34,
          subTitle: "Skills",
          question:
            "How would you rate your student's delays in social-emotional skills?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          description: "Select 1",
          answered: false,
          options: [
            {
              id: 1,
              value: "minimal delays",
              check: false,
            },
            {
              id: 2,
              value: "moderate delays",
              check: false,
            },
            {
              id: 3,
              value: "severe delays",
              check: false,
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 35,
          subTitle: "Concerns",
          question: "Rate your student's progress in each area of concern:",
          select: "Accordian",
          description: "select 1 goals per smart goal",
          dependQuestion: 0,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title: "Compliance",
              level: 1,
              subGoals: [
                "Slight improvement",
                "moderate improvement",
                "significant improvement",
              ],
            },
            {
              title: "Emotional Regulation",
              level: 2,
              subGoals: [
                "Minimal growth",
                "moderate growth",
                "significant growth",
              ],
            },
            {
              title: "Social skills",
              level: 3,
              subGoals: [
                "Small advancement",
                "moderate advancement",
                "major advancement",
              ],
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 36,
          subTitle: "Improvements",
          description: "select 1 goals per smart goal",
          question: "Identify areas of improvement",
          select: "Accordian",
          dependQuestion: 0,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title: "Which improvements were noticed in Compliance?",
              level: 1,
              subGoals: [
                
                `Complying with teacher request P1 agrees with`,
                "Complying with the school rules P1 agrees with",
                "Complying with principal requests P1 agrees with",
              ],
            },
            {
              title: "Which improvements were noticed in Emotional Regulation?",
              level: 2,
              subGoals: [
                "recognizing P3 emotions",
                "labeling P3 emotions",
                "verbalizing P3 feelings",
              ],
            },
            {
              title: "Which improvements were noticed in Social Interaction?",
              level: 3,
              subGoals: [
                "communicate with peers",
                "take turns with peers",
                "negotiate with peers",
              ],
            },
          ],
        },
        {
          isUpdated: false,
          limit: false,
          questionID: 37,
          subTitle: "Struggles",
          description: "Select 2 ",
          question: "Identify areas of struggle",
          select: "Accordian",
          dependQuestion: 0,
          answered: false,
          goalQues: [],
          suberGoals: [
            {
              title: "Which areas are still lacking in compliance?",
              level: 1,
              subGoals: [
                {
                  title:
                    "Complying with teacher requests even if P1 agrees with it",
                  hideIf: ["Complying with teacher requests agrees with"],
                },
                {
                  title: "Complying with school rules even if P1 agrees with it",
                  hideIf: ["Complying with the school rules P1 agrees with"],
                },
                {
                  title:
                    "Complying with principal requests even if P1 agrees with it",
                  hideIf: ["Complying with principal requests P1 agrees with"],
                },
                {
                  title: "Complying with teacher requests P1 disagrees with",
                  hideIf: [],
                },
                {
                  title: "Complying with school rules P1 disagrees with",
                  hideIf: [],
                },
                {
                  title: "Complying with principal requests P1 disagrees with",
                  hideIf: [],
                },
              ],
            },
            {
              title: "Which areas are still lacking in emotional regulation?",
              level: 2,
              subGoals: [
                {
                  title: "recognizing P3 emotions",
                  hideIf: ["recognizing P3 emotions"],
                },
                {
                  title: "labeling P3 emotions",
                  hideIf: ["labeling P3 emotions"],
                },
                {
                  title: "verbalizing P3 feelings",
                  hideIf: ["verbalizing P3 feelings"],
                },
                {
                  title: "Expressing P3 emotions in an appropriate manner",
                  hideIf: [],
                },
                {
                  title: "Avoiding temper tantrums",
                  hideIf: [],
                },
                {
                  title:
                    "Refraining from inappropriate behavior when frustrated or upset",
                  hideIf: [],
                },
                {
                  title: "Relaxing strategies when angry or unhappy",
                  hideIf: [],
                },
              ],
            },
            {
              title: "Which areas are still lacking in social interaction?",
              level: 3,
              subGoals: [
                {
                  title: "communicate effectively with peers",
                  hideIf: ["communicate with peers"],
                },
                {
                  title: "take turns with peers",
                  hideIf: ["take turns with peers"],
                },
                {
                  title: "negotiate with peers",
                  hideIf: ["negotiate with peers"],
                },
                {
                  title: "Initiate conversation with peers",
                  hideIf: [],
                },
                {
                  title: "Initiate activities with peers",
                  hideIf: [],
                },
                {
                  title: "Follow a lead during play",
                  hideIf: [],
                },
                {
                  title: "Maintain eye contact",
                  hideIf: [],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Summary",
      questions: [
        {
          isUpdated: false,
          questionID: 38,
          subTitle: "Benefits",
          question:
            "How would you describe name's range of struggles overall?",
          select: "Multi",
          min: 1,
          max: 1,
          limit: false,
          answered: false,
          options: [
            {
              id: 2,
              value: "all academic domains",
              check: false,
            },
            {
              id: 3,
              value: "many academic domains",
              check: false,
            },
            {
              id: 3,
              value: "some academic domains",
              check: false,
            },
            {
              id: 3,
              value: "many academic and social-emotional domains",
              check: false,
            },
          ],
        },
      ],
    },
  ];

  

  const QUESTIONS = [];

  initialData.map((item) => {
    item.questions.map((it) => {
      console.log("questions item",it)
      QUESTIONS.push(it.question);
    });
  });
  const val2 = initialData.map((qu) => qu.questions);
  const [Data, setData] = useState(initialData);
  const [FormReady, setFormReady] = useState(true);

  const goToQuestion = (data) => {
    if (data) {
      var mainQues = 0;
      var subques = 0;
      data.every((val, index) => {
        mainQues = index;
        var isfind = false;
        val.questions.every((value, point) => {
          if (value.answered == false) {
            subques = point;
            isfind = true;
            return false;
          }
          return true;
        });
        if (isfind) return false;
        return true;
      });

      if (mainQues == 5 && subques == 1) {
        var allChecked = data[mainQues].questions[0].options.filter(
          (x) => x.check === true
        );
        if (allChecked.length == 1 && allChecked[0].value == "none") {
          mainQues = mainQues + 1;
          subques = 0;
        }
      }

      setID(mainQues);
      setQuesID(subques);
    }
  };

  const setNextQuestion = (id, QuesID, grade) => {
    if (id == 0 && QuesID == 0) {
      var toShowOptions = [];
      initialData[id].questions[QuesID].options.forEach((value, index) => {
        if (value.check === true) {
          toShowOptions = toShowOptions.concat(value.show);
        }
      });
      initialData[id].questions[QuesID + 2].options.forEach((value, index) => {
        initialData[id].questions[QuesID + 2].options[index].check = false;
        if (toShowOptions.includes(index)) {
          initialData[id].questions[QuesID + 2].options[index].isHidden = false;
        } else {
          initialData[id].questions[QuesID + 2].options[index].isHidden = true;
        }
      });
    }
    if (id == 1 && QuesID == 1) {
      initialData[id].questions[QuesID + 1].options.forEach((value, index) => {
        if (
          initialData[id].questions[QuesID + 1].options[index].level <= grade
        ) {
          initialData[id].questions[QuesID + 1].options[index].isHidden = false;
        } else {
          initialData[id].questions[QuesID + 1].options[index].isHidden = true;
        }
      });
    }

    if (id == 1 && QuesID == 4) {
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (
            value.level < grade + 1 &&
            value.level >= dependentLevel[0].level
          ) {
            var isPresenrt = option.filter((x) => x.value == value.title);
            if (!isPresenrt.length > 0) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                subGoals.push({
                  text: x,
                  check: false,
                });
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            } else {
              var superGoalIndex = option.findIndex(
                (p) => p.value == value.title
              );
              value.subGoals.forEach((x) => {
                var exsitdGoal = option[superGoalIndex].text.filter(
                  (goal) => goal.text == x
                );
                if (!exsitdGoal.length > 0) {
                  option[superGoalIndex].text.push({
                    text: x,
                    check: false,
                  });
                }
              });
            }
          }
        }
      );
      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 1 && QuesID == 5) {
      var allCheckded = Data[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      var allAnsers = [];
      allCheckded.forEach((value, index) => {
        value.text.forEach((texval, point) => {
          if (texval.check === true) allAnsers.push(texval.text);
        });
      });
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          var isPresenrt = option.filter((x) => x.value == value.title);
          if (!isPresenrt.length > 0) {
            var subGoals = [];
            value.subGoals.forEach((x) => {
              var exsitdGoal = subGoals.filter((goal) => goal.text == x.title);
              if (!exsitdGoal.length > 0) {
                if (
                  x.level <= grade + 1 &&
                  x.level >= dependentLevel[0].level
                ) {
                  if (!allAnsers.includes(x.title)) {
                    subGoals.push({
                      text: x.title,
                      check: false,
                    });
                  }
                }
              }
            });
            option.push({
              value: value.title,
              text: subGoals,
              check: false,
            });
          } else {
            var superGoalIndex = option.findIndex(
              (p) => p.value == value.title
            );
            value.subGoals.forEach((x) => {
              var exsitdGoal = option[superGoalIndex].text.filter(
                (goal) => goal.text == x.title
              );
              if (!exsitdGoal.length > 0) {
                if (
                  x.level <= grade + 1 &&
                  x.level >= dependentLevel[0].level
                ) {
                  if (!allAnsers.includes(x.title)) {
                    option[superGoalIndex].text.push({
                      text: x.title,
                      check: false,
                    });
                  }
                }
              }
            });
          }
        }
      );

      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 2 && QuesID == 1) {
      initialData[id].questions[QuesID + 1].options.forEach((value, index) => {
        if (
          initialData[id].questions[QuesID + 1].options[index].level <= grade
        ) {
          initialData[id].questions[QuesID + 1].options[index].isHidden = false;
        } else {
          initialData[id].questions[QuesID + 1].options[index].isHidden = true;
        }
      });
    }

    if (id == 2 && QuesID == 4) {
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (
            value.level < grade + 1 &&
            value.level >= dependentLevel[0].level
          ) {
            var isPresenrt = option.filter((x) => x.value == value.title);
            if (!isPresenrt.length > 0) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                subGoals.push({
                  text: x,
                  check: false,
                });
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            } else {
              var superGoalIndex = option.findIndex(
                (p) => p.value == value.title
              );
              value.subGoals.forEach((x) => {
                var exsitdGoal = option[superGoalIndex].text.filter(
                  (goal) => goal.text == x
                );
                if (!exsitdGoal.length > 0) {
                  option[superGoalIndex].text.push({
                    text: x,
                    check: false,
                  });
                }
              });
            }
          }
        }
      );
      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 2 && QuesID == 5) {
      var allAnsers = [];
      allCheckded.forEach((value, index) => {
        value.text.forEach((texval, point) => {
          if (texval.check === true) allAnsers.push(texval.text);
        });
      });
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (
            value.level <= grade + 1 &&
            value.level >= dependentLevel[0].level
          ) {
            var isPresenrt = option.filter((x) => x.value == value.title);
            if (!isPresenrt.length > 0) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                var exsitdGoal = subGoals.filter((goal) => goal.text == x);
                if (!exsitdGoal.length > 0) {
                  if (!allAnsers.includes(x)) {
                    subGoals.push({
                      text: x,
                      check: false,
                    });
                  }
                }
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            } else {
              var superGoalIndex = option.findIndex(
                (p) => p.value == value.title
              );
              value.subGoals.forEach((x) => {
                var exsitdGoal = option[superGoalIndex].text.filter(
                  (goal) => goal.text == x
                );
                if (!exsitdGoal.length > 0) {
                  if (!allAnsers.includes(x)) {
                    option[superGoalIndex].text.push({
                      text: x,
                      check: false,
                    });
                  }
                }
              });
            }
          }
        }
      );
      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 3 && QuesID == 0) {
      initialData[id].questions[QuesID + 1].options.forEach((value, index) => {
        if (
          initialData[id].questions[QuesID + 1].options[index].level <= grade
        ) {
          initialData[id].questions[QuesID + 1].options[index].isHidden = false;
        } else {
          initialData[id].questions[QuesID + 1].options[index].isHidden = true;
        }
      });
    }
    if (id == 3 && QuesID == 3) {
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (
            value.level < grade + 1 &&
            value.level >= dependentLevel[0].level
          ) {
            var isPresenrt = option.filter((x) => x.value == value.title);
            if (!isPresenrt.length > 0) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                subGoals.push({
                  text: x,
                  check: false,
                });
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            } else {
              var superGoalIndex = option.findIndex(
                (p) => p.value == value.title
              );
              value.subGoals.forEach((x) => {
                var exsitdGoal = option[superGoalIndex].text.filter(
                  (goal) => goal.text == x
                );
                if (!exsitdGoal.length > 0) {
                  option[superGoalIndex].text.push({
                    text: x,
                    check: false,
                  });
                }
              });
            }
          }
        }
      );
      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 3 && QuesID == 4) {
      var allAnsers = [];
      allCheckded.forEach((value, index) => {
        value.text.forEach((texval, point) => {
          if (texval.check === true) allAnsers.push(texval.text);
        });
      });
      var option = [];
      var dependentLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);
      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          var checkInHide = initialData[id].questions[
            QuesID + 1
          ].removeSuperGoals.filter((x) => x.hide == value.title);
          var toAdd = true;
          if (checkInHide.length > 0) {
            allAnsers.every((x) => {
              if (checkInHide[0].titles.includes(x)) {
                toAdd = false;
                return false;
              }
              return true;
            });
          }
          if (
            value.level <= grade + 1 &&
            value.level >= dependentLevel[0].level &&
            toAdd
          ) {
            var isPresenrt = option.filter((x) => x.value == value.title);
            if (!isPresenrt.length > 0) {
              var subGoals = [];
              value.subGoals.forEach((x) => {
                var exsitdGoal = subGoals.filter((goal) => goal.text == x);
                if (!exsitdGoal.length > 0) {
                  if (!allAnsers.includes(x)) {
                    subGoals.push({
                      text: x,
                      check: false,
                    });
                  }
                }
              });
              option.push({
                value: value.title,
                text: subGoals,
                check: false,
              });
            } else {
              var superGoalIndex = option.findIndex(
                (p) => p.value == value.title
              );
              value.subGoals.forEach((x) => {
                var exsitdGoal = option[superGoalIndex].text.filter(
                  (goal) => goal.text == x
                );
                if (!exsitdGoal.length > 0) {
                  if (!allAnsers.includes(x)) {
                    option[superGoalIndex].text.push({
                      text: x,
                      check: false,
                    });
                  }
                }
              });
            }
          }
        }
      );
      option = option.filter((x) => x.text.length > 0);
      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 4 && QuesID == 3) {
      var allChecked = initialData[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      var toHideOptions = [];
      allChecked.forEach((value, index) => {
        toHideOptions = toHideOptions.concat(value.doHide);
      });
      initialData[id].questions[QuesID + 1].options.forEach((value, index) => {
        initialData[id].questions[QuesID + 1].options[index].check = false;
        if (toHideOptions.includes(index)) {
          initialData[id].questions[QuesID + 1].options[index].isHidden = true;
        } else {
          initialData[id].questions[QuesID + 1].options[index].isHidden = false;
        }
      });
    }

    if (id == 4 && QuesID == 5) {
      var toHideOptions = [];
      allChecked.forEach((value, index) => {
        toHideOptions = toHideOptions.concat(value.doHide);
      });
      initialData[id].questions[QuesID + 1].options.forEach((value, index) => {
        initialData[id].questions[QuesID + 1].options[index].check = false;
        if (toHideOptions.includes(index)) {
          initialData[id].questions[QuesID + 1].options[index].isHidden = true;
        } else {
          initialData[id].questions[QuesID + 1].options[index].isHidden = false;
        }
      });
    }

    if (id == 5 && QuesID == 0) {
      if (allChecked.length == 1 && allChecked[0].value == "none") {
        initialData[id].questions[1].answered = false;
        initialData[id].questions[2].answered = false;
        initialData[id].questions[3].answered = false;
        initialData[id].questions[4].answered = false;
      } else {
      }
    }

    if (id == 5 && QuesID == 1) {
      var allChecked = initialData[id].questions[QuesID].options.filter(
        (x) => x.check === true
      );
      var option = [];
      var checkedLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);

      var DependentLevel = [];
      checkedLevel.forEach((value, index) => {
        if (value.check === true) DependentLevel.push(value.level);
      });

      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (DependentLevel.includes(value.level)) {
            var subGoals = [];
            value.subGoals.forEach((x) => {
              subGoals.push({
                text: x,
                check: false,
              });
            });
            option.push({
              value: value.title,
              text: subGoals,
              check: false,
            });
          }
        }
      );

      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 5 && QuesID == 2) {
      var option = [];
      var checkedLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);

      var DependentLevel = [];
      checkedLevel.forEach((value, index) => {
        if (value.check === true) DependentLevel.push(value.level);
      });

      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (DependentLevel.includes(value.level)) {
            var subGoals = [];
            value.subGoals.forEach((x) => {
              subGoals.push({
                text: x,
                check: false,
              });
            });
            option.push({
              value: value.title,
              text: subGoals,
              check: false,
            });
          }
        }
      );

      initialData[id].questions[QuesID + 1].goalQues = option;
    }

    if (id == 5 && QuesID == 3) {
      var allCheckded = initialData[id].questions[QuesID].goalQues.filter(
        (x) => x.check === true
      );
      var option = [];
      var checkedLevel = initialData[id].questions[
        initialData[id].questions[QuesID + 1].dependQuestion
      ].options.filter((x) => x.check === true);

      var DependentLevel = [];
      var allanswer = [];
      allCheckded.forEach((value, index) => {
        value.text.forEach((val, point) => {
          if (val.check === true) allanswer.push(val.text);
        });
        //if (value.check === true) DependentLevel.push(value.level);
      });

      checkedLevel.forEach((value, index) => {
        if (value.check === true) DependentLevel.push(value.level);
      });

      initialData[id].questions[QuesID + 1].suberGoals.forEach(
        (value, index) => {
          if (DependentLevel.includes(value.level)) {
            var subGoals = [];
            value.subGoals.forEach((x) => {
              if (x.hideIf.length > 0) {
                if (!allanswer.includes(x.hideIf[0])) {
                  subGoals.push({
                    text: x.title,
                    check: false,
                  });
                }
              } else {
                subGoals.push({
                  text: x.title,
                  check: false,
                });
              }
            });
            option.push({
              value: value.title,
              text: subGoals,
              check: false,
            });
          }
        }
      );

      initialData[id].questions[QuesID + 1].goalQues = option;
    }
  };

  const GradeLevels = [
    ["Nursery"],
    ["Kindergarten", "Pre1-A"],
    ["1",1],
    ["2",2],
    ["3",3],
    ["4",4],
    ["5",5],
    ["6",6],
    ["7",7],
    ["8",8],
    ["9",9],
    ["10",10],
    ["11",11],
    ["12",12],
  ];

  

useEffect(()=>{

  if (Data[id].questions[QuesID].select === "Accordian") {
    if(stuDetails.Gender.toLowerCase() === "male" ){
  
      Data[id].questions[QuesID].suberGoals.forEach((val, index) => {
        Data[id].questions[QuesID].suberGoals[index].subGoals.forEach((innserVal,i)=>{
        Data[id].questions[QuesID].suberGoals[index].subGoals[i] = innserVal.replace("P1", "he")
      }) 
    });
  
      Data[id].questions[QuesID].suberGoals.forEach((val, index) => {
        Data[id].questions[QuesID].suberGoals[index ].subGoals.forEach((innserVal,i)=>{
            Data[id].questions[QuesID].suberGoals[index ].subGoals[i] = innserVal.replace("P3", "his")
            
      }) 
    });
    }
  
    setData(Data)
  
      // else{
      //   Data[parent].questions[quesId].suberGoals.forEach((val, index) => {
      //     Data[parent].questions[quesId].suberGoals[index].subGoals.forEach((innserVal,i)=>{
      //       if(typeof Data[parent].questions[quesId].suberGoals[index].subGoals[i] === 'object'){  
      //         Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P1", "she")
      //         Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P2", "her")
      //         Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P3", "her")
      //       }else{
      //       Data[parent].questions[quesId].suberGoals[index].subGoals[i] = innserVal.replace("P1", "she")
      //       // Data[parent].questions[question].suberGoals[index].subGoals[i] = innserVal.replace("P2", "her")
      //       // Data[parent].questions[question].suberGoals[index].subGoals[i] = innserVal.replace("P3", "her")
      //     }
      //   }) 
      // });
      // }
    }

},[Data ])








  const setQuestions = (response) => {
    setFilteredJSON(response.questions);
    let Responsedata = response.questions;
    var studentGender = response.Gender
    var lastitem = Responsedata[Responsedata.length - 1];
    let parent_id = initialData.findIndex(
      (x) => x.title.toLowerCase() === lastitem.groupName.toLowerCase()
    );

    let max_parent_length = initialData[parent_id].questions.length;
    if (max_parent_length - 1 == lastitem?.externalId) {
      setID(parent_id + 1);
      setQuesID(0);
    } else {
      setID(parent_id);
      setQuesID(lastitem?.externalId);
    }

    for (const questionObj of Responsedata) {
      let parent = initialData.findIndex(
        (x) => x.title.toLowerCase() === questionObj.groupName.toLowerCase()
      );
      let quesId = questionObj.externalId;

      if (initialData[parent].questions[quesId].select !== "Accordian") {

        for (const answer of questionObj.answeres) {
          initialData[parent].questions[quesId].options.forEach((val, ind) => {
            initialData[parent].questions[quesId].options[ind].value =
              val.value.replace(/name/g, response.FirstName );
          });
          if(response.Gender.toLowerCase() === "male" ){
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P1","he");
            });
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P2","him");
            });
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P2","his");
            });
          }else{
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P1","she");
            });
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P2","her");
            });
            initialData[parent].questions[quesId].options.forEach((val, ind) => {
              initialData[parent].questions[quesId].options[ind].value =
                val.value.replace("P2","her");
            });
          }



          let findOptionIndex = initialData[parent].questions[
            quesId
          ].options.findIndex(
            (x) => x.value.toLowerCase() === answer.toLowerCase()
          );
          initialData[parent].questions[quesId].answered = true;
          initialData[parent].questions[quesId].options[
            findOptionIndex
          ].check = true;
         
        }
      } else {
        for (const answer of questionObj.answeres) {
          let parent_index = initialData[parent].questions[
            quesId
          ].goalQues.findIndex(
            (x) => x.value.toLowerCase() == answer.value.toLowerCase()
          );
          initialData[parent].questions[quesId].answered = true;
          initialData[parent].questions[quesId].goalQues[
            parent_index
          ].check = true;

          for (const subAnswer of answer.subAnswers) {
            let child_index = initialData[parent].questions[quesId].goalQues[
              parent_index
            ].text.findIndex(
              (x) => x.text.toLowerCase() == subAnswer.toLowerCase()
            );
            initialData[parent].questions[quesId].goalQues[parent_index].text[
              child_index
            ].check = true;
          }
        }
        console.log(studentGender.toLowerCase(), "<<<GEN")  
      
        if(studentGender.toLowerCase() === "male" ){
          initialData[parent].questions[quesId].suberGoals.forEach((val, index) => {
            initialData[parent].questions[quesId].suberGoals[index].subGoals.forEach((innserVal,i)=>{
              if(typeof initialData[parent].questions[quesId].suberGoals[index].subGoals[i] === 'object'){  
                initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title = initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title.replace("P1", "he")
                initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title = initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title.replace("P2", "him")
                initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title = initialData[parent].questions[quesId].suberGoals[index].subGoals[i].title.replace("P3", "his")
  
              }else{
                if(initialData[parent].questions[quesId].suberGoals[index].subGoals[i]){
                  console.log(initialData[parent].questions[quesId].suberGoals[index].subGoals[i], "<-----absdoadfoh")
                  Data[parent].questions[quesId].suberGoals[index].subGoals[i] = Data[parent].questions[quesId].suberGoals[index].subGoals[i].replace("P1", "he")
                  Data[parent].questions[quesId].suberGoals[index].subGoals[i] = Data[parent].questions[quesId].suberGoals[index].subGoals[i].replace("P2", "him")
                  Data[parent].questions[quesId].suberGoals[index].subGoals[i] = Data[parent].questions[quesId].suberGoals[index].subGoals[i].replace("P3", "his")
                  debugger
                  
                }
            }
          }) 
        });
        }else{
          Data[parent].questions[quesId].suberGoals.forEach((val, index) => {
            Data[parent].questions[quesId].suberGoals[index].subGoals.forEach((innserVal,i)=>{
              if(typeof Data[parent].questions[quesId].suberGoals[index].subGoals[i] === 'object'){  
                Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P1", "she")
                Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P2", "her")
                Data[parent].questions[quesId].suberGoals[index].subGoals[i].title = innserVal.title.replace("P3", "her")
              }else{
              Data[parent].questions[quesId].suberGoals[index].subGoals[i] = innserVal.replace("P1", "she")
              // Data[parent].questions[question].suberGoals[index].subGoals[i] = innserVal.replace("P2", "her")
              // Data[parent].questions[question].suberGoals[index].subGoals[i] = innserVal.replace("P3", "her")
            }
          }) 
        });
        }
      }

      let grade = GradeLevels.findIndex((x) => x.includes(response.Grade));

      setNextQuestion(parent, quesId, grade);
    }

    setData(initialData);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);
    const url = `https://31zctjiomj.execute-api.us-east-1.amazonaws.com/default/enhacereport?StudentID=${searchParams.get(
      "StudentID"
    )}&Token=${searchParams.get("Token")}`;

    axios
      .get(url)
      .then((res) => {
        setStuDetails(res.data);

        if (res.data.questions.length) {
          console.log(res.data, "<------res.data")
          setQuestions(res.data);
          // setFilteredJSON(res.data.questions)
        } else {
          setData(initialData);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const titles = Data.map((Titles) => Titles.title);
    const Questions = Data.map((question) => question.questions);
    const select = Questions[id].map((selectValue) => selectValue.select);
    setData(Data);
    setSingleQuestion({
      ...singleQuestion,
      title: titles[id],
      question: Questions[id],
      select: select[QuesID],
    });
    setCurrentNav(id);

    //  const gradeUpdate = Data[1].questions[2].options.filter(x => x.level < grade)
    //  Data[1].questions[2].options = gradeUpdate
  }, [id, QuesID, MultiLimit, goalLevel, MultiLimitSub]);

  const handleSingleQuestion = (i, parent) => {
    console.log(i, parent, id, "<----INDEX MENU");
    // setCurrentSelected(currentSelected.push([{ques: i, group: parent }]))
    if ((i <= QuesID && parent == id) || parent < id) {
      setQuesID(i);
      setID(parent);
    } else {
      console.log(i, parent, "<----INDEX MENU");
    }

    // const titles = Data.map((Titles) => Titles.title);
    // const Questions = Data.map((question) => question.questions);
    // const select = Questions[id].map((selectValue) => selectValue.select);
    // setSingleQuestion({
    //   ...singleQuestion,
    //   title: titles[id],
    //   question: Questions[id],
    //   select: select[QuesID],
    // });
  };

  const handleOpen = (index) => {
    //if(index < 6)
    setCurrentNav(index);
    //setID(index)
  };

  if (FormReady) {
    return (
      <>
        <div className="flex flex-row studentContent">
          <div
            className="flex flex-col studentContent-Left"
            id="studentContentLeft"
          >
            <div className="menuTop flex justify-between items-center">
              <div className="menuIcon">
                <a className="menuInner" onClick={menuFunction}>
                  <img src={menu} />
                  <p>Menu </p>
                </a>
              </div>
              <div className="CloseIcon-Wrap">
                <a className="CloseIcon" onClick={closeFunction}></a>
              </div>
              <div className="menuText" id="MenuQuestion">
                <p>{`${QUESTIONS.length + 1} questions`}</p>
              </div>
            </div>
            <ul className="list-none navTop" id="menuItems">
              {Data?.map((titles, index) => (
                <li className="" onClick={() => handleOpen(index)}>
                  <div className="nav-Wrapper">
                    <span>{titles?.title}</span>
                    <span>{titles?.questions.length}</span>
                    <div className="inline-block float-right rightIcon">
                      <IoIosArrowDown className="" />
                    </div>
                  </div>
                  {/* <p className="flex flex-row-reverse -m-4">5</p> */}
                  <div
                    style={
                      index == currentNav
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  >
                    {titles.questions?.map((questions, i) => {
                      if (!questions.isRandom) {
                        return (
                          <ul>
                            <li
                              className={
                                QuesID === i && id === index
                                  ? "text-xs text-[#47529B] leading-8"
                                  : "text-xs text-[#607889] leading-8"
                              }
                              onClick={() => handleSingleQuestion(i, index)}
                            >
                              {questions.subTitle}

                              <div
                                id="answeredOption"
                                className={
                                  questions.answered === true
                                    ? `inline-block float-right answred rightIcon`
                                    : `inline-block float-right rightIcon`
                                }
                              >
                                <MdOutlineCheck className="" />
                              </div>
                            </li>
                          </ul>
                        );
                      }
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <SingleQuestion
            singleQuestion={singleQuestion}
            QuesID={QuesID}
            setData={setData}
            Data={Data}
            ID={id}
            setMultiLimit={setMultiLimit}
            MultiLimit={MultiLimit}
            CheckID={CheckID}
            setUpdateCheck={setUpdateCheck}
            goalLevel={goalLevel}
            setgoalLevel={setgoalLevel}
            MultiLimitSub={MultiLimitSub}
            setMultiLimitSub={setMultiLimitSub}
            stuDetails={stuDetails}
          />
        </div>
        <Footer
          setQuesID={setQuesID}
          QuesID={QuesID}
          setID={setID}
          id={id}
          singleQuestion={singleQuestion}
          MultiLimit={MultiLimit}
          setMultiLimit={setMultiLimit}
          CheckID={CheckID}
          setUpdateCheck={setUpdateCheck}
          setData={setData}
          Data={Data}
          goalLevel={goalLevel}
          setgoalLevel={setgoalLevel}
          MultiLimitSub={MultiLimitSub}
          setMultiLimitSub={setMultiLimitSub}
          stuDetails={stuDetails}
          QUESTIONS={QUESTIONS}
          initialData={initialData}
          // filteredJSON={filteredJSON}
          // setFilter={setFilter}
        />
      </>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
}

function menuFunction() {
  var x = document.getElementById("menuItems");
  var y = document.getElementById("MenuQuestion");
  var z = document.getElementById("studentContentLeft");
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.display = "block";
    z.classList.remove("openMenu");
  } else {
    x.style.display = "none";
    y.style.display = "none";
    z.classList.add("openMenu");
  }
}

function closeFunction() {
  var x = document.getElementById("menuItems");
  var y = document.getElementById("MenuQuestion");
  var z = document.getElementById("studentContentLeft");
  x.style.display = "block";
  y.style.display = "block";
  z.classList.remove("openMenu");
}
