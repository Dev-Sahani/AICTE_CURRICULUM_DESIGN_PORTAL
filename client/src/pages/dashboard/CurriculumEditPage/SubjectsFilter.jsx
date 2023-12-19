import {
    FilterSearch,
    FilterDropdown,
} from "../../../components";

export default function SubjectsFilter() {
  return (
    <nav className="w-full flex justify-start my-2 gap-32">
        <FilterSearch 
            name="subjectSearch"
            placeholder={"Search Subject Name"}
        />
        <FilterDropdown
          name="subjectCategory"
          defaultValue="Select"
          list={[
            "fwe eoinwve oiewv", 
            "fjewio iouew oiwe oievw",
            "ioej ion iomwefv jio",
          ]}
        />
    </nav>
  )
}
