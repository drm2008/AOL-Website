import { Module } from "../types";

export const MOCK_MODULES: Module[] = [
  {
    id: "m01",
    subject: "Engineering & Science",
    title: "Research Methods & Applied Statistics",
    description: "Learn the fundamentals of research design, data collection, and methodology.",
    content: "Research methods are the strategies, processes or techniques utilized in the collection of data or evidence for analysis in order to uncover new information or create better understanding of a topic.",
    duration: 15,
    dashboards: [
      {
        title: "RMAS: Overview & Outcomes",
        desc: "Full comprehensive overview of the Research Methods & Applied Statistics learning pathways and milestones.",
        url: "./dashboards/rmas_overview.html"
      },
      {
        title: "Part 1: Research Foundations & Philosophy",
        desc: "Explores the philosophical bedrock of scholarly inquiry, distinguishing ways of knowing and reasoning.",
        url: "./dashboards/part1_research_foundations.html"
      },
      {
        title: "Part 2: Research Design & Planning",
        desc: "An interactive blueprint guiding you from initial inquiry to rigorous quantitative study methodology.",
        url: "./dashboards/part2_research_design.html"
      },
      {
        title: "Part 3: Methodology & Data Collection",
        desc: "Overview of quantitative, qualitative, and mixed-methods research designs and data collection instruments.",
        url: "./dashboards/part3_methodology.html"
      },
      {
        title: "Part 4: Sampling & Measurement",
        desc: "Detailed guides for probability/non-probability sampling, validity, reliability, and sample size calculations.",
        url: "./dashboards/part4_sampling.html"
      },
      {
        title: "Part 5: Data Analysis - Statistical Foundations",
        desc: "Interactive statistical frameworks covering univariate, bivariate, multivariate, and assumption testing checks.",
        url: "./dashboards/part5_data_analysis.html"
      },
      {
        title: "Part 6: Research Writing & Dissemination",
        desc: "Syllabus on structuring a thesis, writing literature reviews, contextualizing findings, and writing tips.",
        url: "./dashboards/part6_research_writing.html"
      }
    ]
  },
  {
    id: "m02",
    subject: "Engineering & Science",
    title: "Applied Statistics",
    description: "Explore the laws of probability, distributions, and statistical inference.",
    content: "Applied statistics involves the application of statistical methods to solve real-world problems. It includes collecting, analyzing, and interpreting data to make informed decisions.",
    duration: 20,
    simulators: [
      {
        title: "t-Test Simulator",
        desc: "Interactive Stat-Lab for validating organizational interventions.",
        url: "./t-Test%20Simulator.html"
      }
    ]
  },
  {
    id: "s01",
    subject: "Business & Management",
    title: "Introduction to Business",
    description: "Introduces the fundamentals of business for beginners and those considering a business career.",
    content: "Introduces the fundamentals of business for beginners and those considering a business career. Key areas covered include entrepreneurship, business structures, operations, marketing, finance, banking, securities markets, human resources, and international business — along with career paths in each field.",
    duration: 25,
  },
  {
    id: "h01",
    subject: "Business & Management",
    title: "Organizational Behavior",
    description: "Discover how people behave within organizations and groups.",
    content: "Organizational behavior is the academic study of the ways people act within groups. Its principles are applied primarily in attempts to make businesses operate more effectively.",
    duration: 30,
  },
  {
    id: "b01",
    subject: "Business & Management",
    title: "International Business",
    description: "Learn how companies operate, grow, and manage across borders.",
    content: "International Business explores the challenges and opportunities of operating in global markets, including trade regulations, currency, and cross-cultural management.",
    duration: 30,
  },
  {
    id: "b02",
    subject: "Business & Management",
    title: "Leadership",
    description: "Examine theories and practices to lead effectively in modern organizations.",
    content: "Leadership focuses on the skills and traits needed to guide teams, inspire others, and navigate organizational change.",
    duration: 30,
  },
  {
    id: "b03",
    subject: "Business & Management",
    title: "Global Marketing",
    description: "Discover strategies for marketing products and services worldwide.",
    content: "Global Marketing addresses how to tailor marketing strategies to diverse cultural and economic environments.",
    duration: 30,
  },
  {
    id: "b04",
    subject: "Business & Management",
    title: "Strategic Management",
    description: "Learn how to formulate and implement strategies to achieve organizational goals.",
    content: "Strategic Management covers competitive analysis, strategic planning, and execution within the corporate setting.",
    duration: 30,
  },
  {
    id: "b05",
    subject: "Business & Management",
    title: "Research Methods for Business",
    description: "Understand how to conduct systematic research for business decisions.",
    content: "Covers data collection, analysis, and interpretation to solve business problems and identify opportunities.",
    duration: 30,
  },
  {
    id: "b06",
    subject: "Business & Management",
    title: "Principles of Entrepreneurship",
    description: "Explore the process of creating, launching, and managing a new venture.",
    content: "Principles of Entrepreneurship guides you through ideation, business planning, and funding for startups.",
    duration: 30,
  },
  {
    id: "b07",
    subject: "Business & Management",
    title: "Human Resource Management",
    description: "Learn how to recruit, select, train, and manage employees effectively.",
    content: "Human Resource Management covers the core functions of HR, including compensation, performance management, and labor laws.",
    duration: 30,
  },
  {
    id: "b08",
    subject: "Business & Management",
    title: "Change Management",
    description: "Examine how to lead organizations through periods of transition and change.",
    content: "Change Management addresses the psychological and structural challenges of implementing new processes or technologies.",
    duration: 30,
  },
  {
    id: "b09",
    subject: "Business & Management",
    title: "Principles of Marketing",
    description: "Understand the fundamentals of creating and delivering value to customers.",
    content: "Principles of Marketing covers market research, consumer behavior, and the marketing mix (product, price, place, promotion).",
    duration: 30,
  },
  {
    id: "b10",
    subject: "Business & Management",
    title: "Management of Innovation",
    description: "Learn how to foster and manage innovation within an organization.",
    content: "Management of Innovation explores how companies create new products, services, and business models to stay competitive.",
    duration: 30,
  },
  {
    id: "b11",
    subject: "Business & Management",
    title: "Project Management",
    description: "Discover methodologies for planning, executing, and closing projects.",
    content: "Project Management covers tools and techniques for managing scope, time, cost, and quality in any project.",
    duration: 30,
  },
  {
    id: "b12",
    subject: "Business & Management",
    title: "Business Innovation & Research",
    description: "Explore the intersection of business research and technological innovation.",
    content: "Business Innovation & Research focuses on applying systematic inquiry to drive transformative business solutions.",
    duration: 30,
  },
  {
    id: "b13",
    subject: "Business & Management",
    title: "New Product Management",
    description: "Learn the entire lifecycle of managing a new product from concept to market.",
    content: "New Product Management addresses product strategy, development, launch marketing, and post-launch optimization.",
    duration: 30,
  },
  {
    id: "b14",
    subject: "Business & Management",
    title: "Small Business Management",
    description: "Examine the unique challenges and strategies of running a small enterprise.",
    content: "Small Business Management covers daily operations, local marketing, team building, and financial survival for small businesses.",
    duration: 30,
  },
  {
    id: "b15",
    subject: "Business & Management",
    title: "Conflict and Negotiation Management",
    description: "Develop skills to resolve disputes and negotiate favorable outcomes.",
    content: "Conflict and Negotiation Management explores strategies for effective communication, mediation, and deal-making.",
    duration: 30,
  }
];
