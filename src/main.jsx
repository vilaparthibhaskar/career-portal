import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import "./styles.css";

const DEFAULT_FILTERS = {
  role: "Software Engineer",
  experience: "3 years",
  location: "United States",
  sort: "Latest posted",
  field: "Software",
};

const companies = [
  {
    name: "Google",
    domain: "google.com",
    accent: "#4285f4",
    portal: "Google Careers",
    url: "https://www.google.com/about/careers/applications/jobs/results?hl=en_US&location=United%20States&target_level=EARLY&sort_by=date&employment_type=FULL_TIME&q=%22Software%20Engineer%22",
  },
  {
    name: "Meta",
    domain: "metacareers.com",
    accent: "#0668e1",
    portal: "Meta Careers",
    url: "https://www.metacareers.com/jobsearch/?sort_by_new=true&roles[0]=Full%20time%20employment&roles[1]=Internship&teams[0]=University%20Grad%20-%20Engineering%2C%20Tech%20%26%20Design&teams[1]=University%20Grad%20-%20PhD%20%26%20Postdoc&teams[2]=Software%20Engineering",
  },
  {
    name: "Amazon",
    domain: "amazon.jobs",
    accent: "#ff9900",
    portal: "Amazon Jobs",
    url: "https://www.amazon.jobs/en/search?offset=0&result_limit=10&sort=recent&category%5B%5D=software-development&job_type%5B%5D=Full-Time&distanceType=Mi&radius=Anykm&industry_experience=one_to_three_years&latitude=38.89036&longitude=-77.03196&loc_group_id=&loc_query=United%20States&base_query=&city=&country=USA&region=&county=&query_options=&",
  },
  {
    name: "Microsoft",
    domain: "microsoft.com",
    accent: "#00a4ef",
    portal: "Microsoft Careers",
    url: "https://apply.careers.microsoft.com/careers?start=0&location=united+states&pid=1970393556926963&sort_by=timestamp&filter_include_remote=1&filter_include_relocation=0&filter_seniority=Entry",
  },
  {
    name: "Apple",
    domain: "apple.com",
    accent: "#6e6e73",
    portal: "Apple Jobs",
    url: "https://jobs.apple.com/en-us/search?search=Software+Engineer&sort=newest&location=united-states-USA&team=apps-and-frameworks-SFTWR-AF+cloud-and-back-end-infrastructure-SFTWR-CLD+information-systems-and-technology-SFTWR-ISTECH+machine-learning-and-ai-SFTWR-MCHLN+software-quality-automation-tools-and-validation-SFTWR-SQAT+internships-STDNT-INTRN",
  },
  {
    name: "Netflix",
    domain: "netflix.com",
    accent: "#e50914",
    portal: "Netflix Jobs",
    url: "https://explore.jobs.netflix.net/careers?query=software&location=United%20States&pid=790318344742&domain=netflix.com&sort_by=new&triggerGoButton=true&triggerGoButton=false",
  },
  {
    name: "Tesla",
    domain: "tesla.com",
    accent: "#cc0000",
    portal: "Tesla Careers",
    url: "https://www.tesla.com/careers/search/?query=software&department=engineering-information-technology&region=5",
  },
  {
    name: "Fidelity",
    domain: "fidelity.com",
    accent: "#2f7d32",
    portal: "Fidelity Careers",
    url: "https://jobs.fidelity.com/en/jobs/?search=Software%20Engineer&team=Technology&pagesize=20&origin=filtered#results",
  },
  {
    name: "Goldman Sachs",
    domain: "goldmansachs.com",
    accent: "#7399c6",
    portal: "Goldman Sachs Careers",
    url: "https://higher.gs.com/results?EXPERIENCE_LEVEL=Associate&JOB_FUNCTION=Software%20Engineering&LOCATION=AZ|Albany|Atlanta|Baltimore|Boston|Chicago|Dallas|Deerfield|Detroit|Draper|Houston|Irving|Richardson|Jersey%20City|Los%20Angeles|Newport%20Beach|San%20Francisco|Miami|West%20Palm%20Beach|Nashville|New%20York|Philadelphia|Pittsburgh|Salt%20Lake%20City|Seattle|Washington|Wilmington&page=1&sort=RELEVANCE",
  },
  {
    name: "NVIDIA",
    domain: "nvidia.com",
    accent: "#76b900",
    portal: "NVIDIA Careers",
    url: "https://nvidia.wd5.myworkdayjobs.com/en-US/NVIDIAExternalCareerSite/details/Software-Engineer--CUDA-Q_JR2011649?q=Software%20enginner%203%20years&locationCountry=bc33aa3152ec42d4995f4791a106ed09&locationHierarchy1=2fcb99c455831013ea52fb338f2932d8&jobFamilyGroup=0c40f6bd1d8f10ae43ffaefd46dc7e78&jobFamilyGroup=0c40f6bd1d8f10ae43ffbd1459047e84&workerSubType=ab40a98049581037a3ada55b087049b7&workerSubType=0c40f6bd1d8f10adf6dae161b1844a15",
  },
  {
    name: "Salesforce",
    domain: "salesforce.com",
    accent: "#00a1e0",
    portal: "Salesforce Careers",
    url: "https://www.salesforce.com/company/careers/jobs/?search=Software+Engineer&country=United+States+of+America&sortBy=postedDate&team=Software+Engineering&page=1",
  },
  {
    name: "Oracle",
    domain: "oracle.com",
    accent: "#c74634",
    portal: "Oracle Careers",
    url: "https://careers.oracle.com/en/sites/jobsearch/jobs?keyword=Software+Engineer&lastSelectedFacet=POSTING_DATES&location=United+States&locationId=300000000149325&locationLevel=country&mode=location&selectedFlexFieldsFacets=%22AttributeChar6%7C3+to+5%2B+years%22&selectedLocationsFacet=300000000149325&selectedPostingDatesFacet=30%3B7&sortBy=POSTING_DATES_DESC",
  },
  {
    name: "Adobe",
    domain: "adobe.com",
    accent: "#fa0f00",
    portal: "Adobe Careers",
    url: "https://careers.adobe.com/us/en/search-results?keywords=Software%20Engineer",
  },
  {
    name: "Airbnb",
    domain: "airbnb.com",
    accent: "#ff5a5f",
    portal: "Airbnb Careers",
    url: "https://careers.airbnb.com/positions/?_search_input=software&_departments=engineering&_where_you_work=united-states",
  },
  {
    name: "Qualcomm",
    domain: "qualcomm.com",
    accent: "#3253dc",
    portal: "Qualcomm Careers",
    url: "https://careers.qualcomm.com/careers?query=Software+Engineering&start=20&location=United+States&pid=446720947905&sort_by=timestamp&filter_include_remote=0&filter_include_relocation=0",
  },
  {
    name: "Stripe",
    domain: "stripe.com",
    accent: "#635bff",
    portal: "Stripe Jobs",
    url: "https://stripe.com/careers/search?office_locations=North+America--United+States&query=Software+Engineer&locations=North+America--United+States",
  },
  {
    name: "Databricks",
    domain: "databricks.com",
    accent: "#ff3621",
    portal: "Databricks Careers",
    url: "https://www.databricks.com/company/careers/open-positions?department=Engineering&location=United%20States&search=Software%20Engineer",
  },
  {
    name: "Cloudflare",
    domain: "cloudflare.com",
    accent: "#f38020",
    portal: "Cloudflare Careers",
    url: "https://www.cloudflare.com/careers/jobs/?keyword=Software%20Engineer&location=United%20States",
  },
  {
    name: "Snowflake",
    domain: "snowflake.com",
    accent: "#29b5e8",
    portal: "Snowflake Careers",
    url: "https://careers.snowflake.com/us/en/search-results?keywords=Software%20Engineer&location=United%20States&sortBy=Most%20recent",
  },
];

function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [companyQuery, setCompanyQuery] = useState("");

  const visibleCompanies = useMemo(() => {
    const query = companyQuery.trim().toLowerCase();
    if (!query) return companies;
    return companies.filter((company) => company.name.toLowerCase().includes(query));
  }, [companyQuery]);

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const openCompany = (company) => {
    window.open(company.url, "_blank", "noopener,noreferrer");
  };

  const openAll = () => {
    visibleCompanies.forEach((company, index) => {
      window.setTimeout(() => openCompany(company), index * 120);
    });
  };

  return (
    <main>
      <section className="topbar">
        <div className="brand">
          <div className="brandMark">
            <BriefcaseBusiness size={24} />
          </div>
          <div>
            <h1>Career Portal Finder</h1>
            <p>One click to filtered software roles across your target companies.</p>
          </div>
        </div>
        <button className="primaryButton" onClick={openAll}>
          <ArrowUpRight size={18} />
          Open visible companies
        </button>
      </section>

      <section className="filters" aria-label="Career filters">
        <div className="filterHeader">
          <Filter size={18} />
          <span>Search criteria</span>
        </div>
        <label>
          <span>Role</span>
          <input
            value={filters.role}
            onChange={(event) => updateFilter("role", event.target.value)}
            placeholder="Software Engineer"
          />
        </label>
        <label>
          <span>Experience</span>
          <select
            value={filters.experience}
            onChange={(event) => updateFilter("experience", event.target.value)}
          >
            <option>0-1 years</option>
            <option>2 years</option>
            <option>3 years</option>
            <option>4-6 years</option>
            <option>7+ years</option>
          </select>
        </label>
        <label>
          <span>Field</span>
          <select value={filters.field} onChange={(event) => updateFilter("field", event.target.value)}>
            <option>Software</option>
            <option>Data</option>
            <option>AI / ML</option>
            <option>Cloud</option>
            <option>Security</option>
          </select>
        </label>
        <label>
          <span>Location</span>
          <input
            value={filters.location}
            onChange={(event) => updateFilter("location", event.target.value)}
            placeholder="United States"
          />
        </label>
        <label>
          <span>Sort</span>
          <select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)}>
            <option>Latest posted</option>
            <option>Most relevant</option>
          </select>
        </label>
      </section>

      <section className="utilityRow">
        <div className="searchBox">
          <Search size={18} />
          <input
            value={companyQuery}
            onChange={(event) => setCompanyQuery(event.target.value)}
            placeholder="Search companies"
            aria-label="Search companies"
          />
        </div>
        <div className="summary">
          <SlidersHorizontal size={17} />
          <span>
            {filters.experience} | {filters.field} | {filters.location} | {filters.sort}
          </span>
        </div>
      </section>

      <section className="companyGrid" aria-label="Company career portals">
        {visibleCompanies.map((company) => (
          <article className="companyCard" key={company.name} style={{ "--accent": company.accent }}>
            <div className="companyTop">
              <img
                className="logo"
                src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=96`}
                alt=""
              />
              <button className="iconButton" onClick={() => openCompany(company)} aria-label={`Open ${company.name}`}>
                <ArrowUpRight size={18} />
              </button>
            </div>
            <div>
              <h2>{company.name}</h2>
              <p>{company.portal}</p>
            </div>
            <div className="cardMeta">
              <span>
                <Building2 size={15} />
                {filters.field}
              </span>
              <span>
                <MapPin size={15} />
                US roles
              </span>
            </div>
            <button className="cardButton" onClick={() => openCompany(company)}>
              <Check size={17} />
              Open static career search
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
