const addNewProject = async (req, res) => {
  // Form validation
  const { errors, isValid } = validateProjectInput(req.body);
  // Check Validation
  if (!isValid) {
      return res.status(400).json(errors);
  }

  // Add the project
  Project.findOne({ title: req.body.title}).then(project => {
      if (project) {
        return res.status(400).json( { title: "Project title already exists" });
      } else {
        const newProject = new Project ({
            title: req.body.title,
            brief: req.body.brief,
            description: req.body.description,
            picture: req.body.picture
        });

        newProject.save().then(project => res.json(project)).catch(err => console.log(err));
      }
  });  
}

const fetchAll = async (req, res, next) => {
  try {
    const projects = await Project.find().select("title brief picture");
    return res.status(200).json({projects});
  } catch (error) {
    next(error);
  }
}

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).select("title brief picture description");
    if(!project) throw new Error("Project Not Found!")
    res.status(200).json({project});
  } catch (error) {
    next(error);
  }
}

const addDummyData = async (req, res, next) => {
  try {
    const inserDetails = await Project.insertMany([
      {
          "title": "The sky cleanup",
          "picture": "skycleanup",
          "brief": "Paradigm shift in carbon fixation through model biotech methods",
          "description": "New model carbon fixation method 400x more efficient than trees Nd has shown promise to capture 10gigatonnes of co2 ergo possibly even reverse global warming"
      },
      {
          "title": "BlockVotes",
          "picture": "blockvotes",
          "brief": "Building trust in the Election process by leveraging the power of Blockchain.",
          "description": "The biggest allegation that election commission faces is that they are biased with the winning party. Even after making so many efforts, still the political parties, voters and even election commission have no confidence over the Electronic Voting Machines and the overall process as well.\nSo by leveraging the power of Blockchain we can build trust among them by providing an end to end IOT based transparent and immutable solution."
      },
      {
          "title": "The Hobby Tribe ",
          "picture": "hobbytribe",
          "brief": "We provide budget classes for whatever hobby you desire closest to where you reside.",
          "description": "We provide budget classes for any Hobby you desire to pursue. We are a group of hobby enthusiasts who want to bring about change in the way hobbies are looked upon. Gone are the days, for excuses to not pick up a hobby of your liking, considering all possibilities and budget rates, the future of hobbies is here."
      },
      {
          "title": "evEntry",
          "picture": "evEntry",
          "brief": "An open source ticketing solutions app, open source being the keyword. Currently compatible with Android and soon to be available as a web-app.",
          "description": "An open source ticketing solutions app, open source being the keyword. Currently compatible with Android and soon to be available as a web-app. This is a 2-part app, which means that evEntry has 2 separate apps, one for the user who can book tickets for events he/she wants to attend, and the other app is for the event managers or anyone who wants to list their events on their app. If you are wondering how is another ticketing solutions app going to survive in a market where companies like BigTree (BookMyShow) and paytm(Insider) are already doing so well. My app unlike the other apps, is open source, which means ANYONE can list their event on the app, from free events to paid events, from a large scale(thousands in entries) event to a small scale event(50-100 entries) it can manage it all. "
      },
      {
          "title": "MySwiftly",
          "picture": "myswiftly",
          "brief": "our App helps people to skip queue in supermarkets by just by scan pay and go",
          "description": "MySwiftly will revolutionize the way people shop at\nsupermarkets.. Long queues is a big unsolved problem for both\nretailers and shoppers, as long lines means slow service, low\ncustomer retention and tarnished brand image, it costs marts gobally\nover 200 billion dollors annually, to solve this problem , MySwiftly App\nis here to provide you a cashier less , queue-less , shopping\nexperience."
      },
      {
          "title": "Project Dakshata",
          "picture": "projectDakshata",
          "brief": "To make life easier for under resourced communities through basic scientific innovations.",
          "description": "We aspire to recognise pain points faced by various communities and develop innovative solutions with the help of our technical backgrounds. The primary goal of Project Dakshata is to introduce society to more efficient practices in their daily lives.\nVariants of our first innovation, The Repellaint, will impact both the urban and rural populations.\nThe Main Strengths of the Repellaint lie in the fact that it’s a single solution to 3 problems faced by our beneficiaries. The features of the Repellaint are:\n1)Insect/Mosquito repellence\n2)Water-proofing\n3)Heat Insulation\nHence, not only will the application of the Repellaint make your property immune to insects, it will also ensure that no water leakages occur thereby helping consumers cut costs of additionally waterproofing their homes after the process of painting them. The heat insulation feature will allow consumers to cut down significantly on energy costs incurred to regulate the temperatures within their property.\n"
      },
      {
          "title": "FomoTech",
          "picture": "fomotech",
          "brief": "Making people aware about various technologies and giving a hands on experience. ",
          "description": "We hope to conduct various workshops in schools so that students are aware about the diverse topics available. "
      },
      {
          "title": "An Exchange for Apps",
          "picture": "mrr",
          "brief": "Helps Startups get all the necessary and initial help.",
          "description": "Getting started up with a company is really difficult in india u don't know much about corporate environment you don't know from where to gather resources u r lost and almost many times cheated and some leave the struggle and quit. So we r here to help them get off ground through validating their idea to getting them resources to getting them funding."
      },
      {
          "title": "Daruma",
          "picture": "OBcapital",
          "brief": "Investment platform for students",
          "description": "We create a passive source of income."
      },
      {
          "title": "Agnirakshak",
          "picture": "agnirakshak",
          "brief": "This is a Smart(Iot based) fire exhaust system",
          "description": "This module not only integrates the fire exhaust system with the fire department but also will connect to the owner of the house.\nWe have also added a web camera to our module which can be seen by the fire department as soon as the alarm is triggered.\nThis helps the fire department to assess the situation and take the appropriate action respectively.\nThe module is feasible and approximately Rs. 2000 only.\n"
      },
      {
          "title": "Sinister Cookie",
          "picture": "analyticalhouse",
          "brief": "Analytical house renting",
          "description": "Its a web based application which provides the customer to find the rooms for rent by comparing prices with the help of the graphs. And also helps the landlord to easily put their houses to rents without any commission."
      },
      {
          "title": "Foreca",
          "picture": "foreca",
          "brief": "To change the way purchase/procurement happens in the HoReCa sector\n(Hotels, Restaurants and Caterers)",
          "description": "We are a 2 year old start-up operating in the Agri-tech industry\nWe aim at providing technology empowered procurement solutions for Hotels restaurants and Carters"
      },
      {
          "title": "Corner Network",
          "picture": "cornerNetwork",
          "brief": "Organising the unorganized retail grocery store",
          "description": "Organising unorganized retail grocery store using technology. "
      }
  ]);
  console.log({inserDetails});
  return res.status(200).json({inserDetails});
  } catch (error) {
    next(error);
  }
}

module.exports = {addNewProject, fetchAll, getProject, addDummyData};