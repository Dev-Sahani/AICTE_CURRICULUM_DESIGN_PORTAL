import { useParams } from "react-router-dom";
import { 
  CourseInput, 
  CourseDropdown, 
  Label, 
  AddCourseInput 
} from "../../../components";
import { getAllLevels, getAllProgrammes } from "../../../utils/getAllProgramAndLevels";

export default function BasicInfoPage() {
  const {common_id} = useParams();
  return (
    <>
      <div>
        <Label breakLine={true}>Course Name</Label>
        <CourseInput
          name="title"
          placeholder="Enter Course name..."
          className="w-[90%]"
        />
        
        <div className="flex gap-8 my-4 items-center">
          <Label>Level</Label>
          <CourseDropdown
            name="level"
            // Default Values 
            list={getAllLevels}
          />
        </div>

        <div className="flex gap-8 my-4 items-center">
          <Label>Program</Label>
          <CourseDropdown
            name="program"
            // Default Values 
            list={getAllProgrammes}
          />
        </div>

          <Label large breakLine className="mt-6">Objectives</Label>
          <AddCourseInput 
            propertyName="objectives"
            arr={[
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
            ]}
            className="w-[90%]"
          />

          <Label large breakLine className="w-[15vw] mt-6">Learning Outcomes</Label>
          <AddCourseInput 
            propertyName="outcomes"
            arr={[
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
              "lorem ipsum fehawiovn oieafjioew oivehaw iojfenva aef",
            ]}
            className="w-[90%]"
          />
      </div>
    </>
  )
}


const getCourseWithId = (courseId)=>{
  return {
    _id: "65784783aef6475db0782335",
    common_id: "6571621e28735d1182f1016b",
    version: 3,
    title: "Mechatronics Engineering",
    // message: "<message content>",
    // preface: "<preface content>",
    message: "The quality of technical education depends on many factors but largely on outcome based socially and industrially relevant curriculum, good quality motivated faculty, teaching learning process, effective industry internship and evaluation of students based on desired outcomes. Therefore, it was imperative that a Model Curriculum be prepared by best experts from academia and industry, keeping in view the latest industry trends and market requirements and be made available to all universities / board of technical education and engineering institutions in the country. AICTE constituted team of experts to prepare the model curriculum of UG Degree Course in Mechatronics Engineering. Similar exercise is done for other UG, Diploma and PG level in engineering, MBA, PGDM, Architecture, etc. It comprises of basic science and engineering courses, having focus on fundamentals, significant discipline level courses and ample electives both from the disciplines and cross disciplines including emerging areas all within a cumulative structure of 163 credits. Summer Internships have been embedded to make the student understand the industry requirements and have hands on experience. Virtual Labs has been introduced for few experiments. Also, most courses have been mapped to its equivalent SWAYAM/NPTEL Course to offer an alternative for learning that course online from SWAYAM. These features will allow students to develop a problem-solving approach to face the challenges in the future and develop outcome based learning approach. As a major initiative by AICTE, a three-week mandatory induction program for students has also been designed and has to be given at the beginning of the course. The idea behind this is to make the students feel comfortable in their new environment, open them up, set a healthy daily routine, develop awareness, sensitivity and understanding of the self, people around them, society at large, and nature. AICTE places on record, special thanks to Prof. Sunil Jha, Prof. S.D. Agashe, Prof. Ashiv Shah and Mr. Vikram Mattoo. We are sure that this Model Curriculum will help to enhance not just the employability skills but will also enable youngsters to become job creators. We strongly urge the institutions / universities / boards of technical education in India to adopt this Model Curriculum at the earliest. This is a suggestive curriculum and the concerned university / institution / board should build on and exercise flexibility in readjustment of courses within the overall 163 credits. (Prof. Anil D. Sahasrabudhe) Chairman All India Council for Technical Education",
    preface: "Taking cognizance of growing concern about quality of technical education in India, AICTE in its 49th council meeting held on 14.03.2017 approved a package of measures for improving quality of technical education - Revision of Curriculum, Mandatory Internship, and Student Induction Program were amongst the few. AICTE constituted committee of academia industry experts to prepare model curriculum of UG Course in Mechatronics Engineering. During the development of curriculum, the employability and employment opportunities for graduates, future ready workforce who will be skilled enough to handle the rapid growth in the field of Mechatronics were kept in mind. AICTE has introduced mandatory internship in the new curriculum which will equip the students with practical understanding and training about industry practices in a suitable industry or organization. In the course of development of model curriculum, the committee took feedback of industry experts on the draft curriculum and accordingly modified the draft before finalization. This exercise has ensured that essential emphasis on industry requirements and market trends, employability and problem-solving approach is given. After due deliberations, the scheme and syllabus have been formulated. Salient features of this model curriculum are enumerated as under:  Reduced number of credits.  Introduction of Student Induction Program.  Well-defined learning objectives & outcomes for each course.  Inclusion of courses on socially relevant topics.  Built-in flexibility to the students in terms of professional elective and open elective courses.  Mandatory internship to equip the students with practical knowledge and provide them exposure to real time industrial environments.  Virtual Labs.  Mapping of Courses to its equivalent NPTEL/SWAYAM Course.  Course on ‘Entrepreneurship and Startups’ to encourage entrepreneurial mindset. I gratefully acknowledge the time and efforts of the members of the working group namely Prof. Sunil Jha of IIT Delhi; Prof. S.D. Agashe of College of Engineering, Pune; Prof. Ashiv Shah of AKG Engineering College and Mr. Vikram Mattoo of Mitsubishi Electric India Pvt. Ltd. We also appreciate the feedback on the draft received from Mr. Manoj Yadav of KUKA Robotics; Mr. Bipin Chandra of EDAG Production Solutions Pvt. Ltd., Mr. Chetan Rajdev of Hydac India, Mr. Brajesh Poddar of North SMC Corporation India, Mr. Sangeet of Adverb Technologies and Dr. O.P. Goel of Bosch India. Special thanks to Prof. Anil D. Sahasrabudhe, Chairman; Prof. M.P. Poonia, Vice-Chairman; and Prof. Rajive Kumar, Member Secretary, AICTE who all have been instrumental and encouraging throughout the process of development of this model curriculum. vi I appreciate the dedication put by the Dr. Neeraj Saxena, Adviser-II; Dr. Pradeep C. Bhaskar, Assistant Director (P&AP); Mr. Dharmesh Kumar Dewangan, Young Professional (P&AP); Mr. Rakesh Kumar Pandit Young Professional (P&AP); and other office staff of AICTE. (Prof. Dileep N. Malkhede) Advisor – I Policy and Academic Planning Bureau All India Council for Technical Education",
    acknowledgement: "To Team 8BitSquad",
    committee: [],
    definitionOfCredits: [
      {
        activity: "1 Hr. Lecture (L) per week",
        overallCredits: 1,
        _id: "65784783aef6475db0782331"
      },
      {
        activity: "1 Hr. Tutorial (T) per week 1 Credit",
        overallCredits: 1,
        _id: "65784783aef6475db0782332"
      },
      {
        activity: "1 Hr. Practical (P) per week 0.5 Credit",
        overallCredits: 0.5,
        _id: "65784783aef6475db0782333"
      }
    ],
    rangeOfCredits: {
      text: "In the light of the fact that a typical Model Four-year Under Graduate Degree program in Engineering has about 163 credits, the total number of credits proposed for the four-year UG Program (B.E. / B. Tech) in Mechatronics Engineering is 163.",
      credits: 163
    },
    guidlines: [],
    codesAndDef: [
      {
        code: "L",
        definition: "Lecture",
        _id: "6574974f8c4ee833b48a3790"
      },
      {
        code: "T",
        definition: "Tutorial",
        _id: "6574974f8c4ee833b48a3791"
      },
      {
        code: "P",
        definition: "Practical",
        _id: "6574974f8c4ee833b48a3792"
      },
      {
        code: "C",
        definition: "Credits",
        _id: "6574974f8c4ee833b48a3793"
      },
      {
        code: "MT",
        definition: "Engineering Core courses / Basic ScienceCourses / Laboratory Courses / Projects /Internships / Engineering ScienceCourses",
        _id: "6574974f8c4ee833b48a3794"
      },
      {
        code: "MTPE",
        definition: "Professional Elective Courses",
        _id: "6574974f8c4ee833b48a3795"
      },
      {
        code: "MTOE",
        definition: "Open Elective Courses",
        _id: "6574974f8c4ee833b48a3796"
      },
      {
        code: "AU",
        definition: "Audit Courses",
        _id: "6574974f8c4ee833b48a3797"
      },
      {
        code: "MT - Y0X",
        definition: "Theory subjects",
        _id: "6574974f8c4ee833b48a3798"
      },
      {
        code: "MT - Y1X",
        definition: "Labs & Practical",
        _id: "6574974f8c4ee833b48a3799"
      },
      {
        code: "MTPE - Y0X",
        definition: "Professional Elective Subjects",
        _id: "6574974f8c4ee833b48a379a"
      },
      {
        code: "MTOE - Y0X",
        definition: "Open Elective Subjects",
        _id: "6574974f8c4ee833b48a379b"
      },
      {
        code: "AU – Y0X",
        definition: "Audit Subjects",
        _id: "6574974f8c4ee833b48a379c"
      }
    ],
    subjects: [
      {
        common_id: "6571674828735d1182fe943f",
        version: 2,
        title: "Physics - I",
        credits: 5.6,
        category: "MT",
        code: "MT-101",
        semester: 1,
        weeklyHours: 4,
        _id: "6574974f8c4ee833b48a379d"
      },
      {
        common_id: "657499a88353078c85730830",
        version: 1,
        title: "Computer Organization",
        credits: 1,
        category: "MT",
        code: "MT-403",
        semester: 3,
        weeklyHours: 5,
        _id: "65784783aef6475db078232f"
      },
      {
        title: "Introduction to programming",
        credits: 4,
        category: "Code",
        code: "MT-102",
        semester: 2,
        _id: "65784783aef6475db0782334"
      }
    ],
    dateOfCommit: {
      $date: {
        $numberLong: "1702381443824"
      }
    },
    __v: 0,
    level: "undergraduate",
    program: "Engineering & Technology"
  }; 
}