import FilterSearch from '../../../components/FilterSearch'
import FilterDropdown from '../../../components/FilterDropdown'

export default function TemplatePageFilter() {

  return (
    <nav className="w-full flex justify-evenly my-2">
        <FilterSearch 
            name="Resourcesearch"
            placeholder={"Search Resources"}
        />
        <FilterDropdown
          name="Resourcedrop"
          defaultValue="Select Format "
          list={["Books","Tutorial Videos","Notes","Practice Sheets ,Last year Paper"]}
        />
        <FilterDropdown
          name="Resourcedown"
          defaultValue="Select Subject"
          list={[
            "Applied Arts and Crafts", 
            "Architecture and Town Planning", 
            "Architecture", 
            "Town Planning", 
            "Engineering & Technology", 
            "Hotel Management and Catering", 
            "Management", 
            "MCA", 
            "Pharmacy"
          ]}
        />
    </nav>
  )
}
