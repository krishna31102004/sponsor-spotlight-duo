import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Target, 
  TrendingUp, 
  Share2, 
  Eye, 
  MapPin, 
  CheckCircle2,
  Filter,
  Heart,
  Mail,
  Calendar,
  DollarSign
} from "lucide-react";

const SponsorshipHub = () => {
  const [activeView, setActiveView] = useState<"business" | "sponsor">("business");
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);

  const businessData = {
    name: "ASU Circle Innovators",
    category: "Student hackathon team",
    location: "Tempe, AZ",
    audienceSize: "500+ students",
    fundingGoal: 5000,
    raisedSoFar: 2800,
    purpose: "Cover venue costs, prizes, and travel scholarships for underrepresented students participating in our annual Campus AI Showcase.",
    stats: [
      { label: "Expected Participants", value: "500+" },
      { label: "Social Followers", value: "2.3K" },
      { label: "Previous Event Reach", value: "10K+" },
      { label: "Student Projects", value: "50+" }
    ],
    benefits: [
      "Logo on all event banners and website",
      "Dedicated social media shout-outs",
      "Booth space at showcase event",
      "Access to student resumes and portfolios",
      "Speaking opportunity at opening ceremony",
      "Recognition in press releases"
    ]
  };

  const opportunities = [
    {
      id: 1,
      name: "ASU Circle Innovators",
      category: "Student Event",
      mission: "Empowering next-gen AI talent through hands-on showcase events",
      audienceSize: "500+",
      requestedAmount: "$5,000",
      fitScore: 92,
      details: {
        story: "We're a student-led organization passionate about making AI education accessible. Our Campus AI Showcase brings together students from diverse backgrounds to build, learn, and compete in a supportive environment.",
        breakdown: [
          { item: "Venue & Equipment", amount: "$2,000" },
          { item: "Travel Scholarships", amount: "$1,500" },
          { item: "Prizes & Materials", amount: "$1,500" }
        ]
      }
    },
    {
      id: 2,
      name: "Tech Community Collective",
      category: "Nonprofit Partner",
      mission: "Building inclusive tech communities in underserved neighborhoods",
      audienceSize: "1,200+",
      requestedAmount: "$8,000",
      fitScore: 85,
      details: {
        story: "We organize free coding workshops and mentorship programs for youth in underserved communities, helping bridge the digital divide and create pathways to tech careers.",
        breakdown: [
          { item: "Workshop Materials", amount: "$3,000" },
          { item: "Mentor Stipends", amount: "$3,500" },
          { item: "Student Laptops", amount: "$1,500" }
        ]
      }
    },
    {
      id: 3,
      name: "Campus Sustainability Initiative",
      category: "Student Research",
      mission: "Developing smart solutions for campus environmental challenges",
      audienceSize: "800+",
      requestedAmount: "$4,500",
      fitScore: 78,
      details: {
        story: "Our team is building IoT sensors and data analytics tools to help the university reduce waste and optimize energy consumption across campus buildings.",
        breakdown: [
          { item: "Sensor Hardware", amount: "$2,500" },
          { item: "Cloud Infrastructure", amount: "$1,000" },
          { item: "Research & Testing", amount: "$1,000" }
        ]
      }
    }
  ];

  const selectedOpp = opportunities.find(o => o.id === selectedOpportunity);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground">Sponsorship Hub</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Match student projects with sponsors in a trusted way
          </p>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-primary font-medium text-center">
            💼 This template lets us show both perspectives in partner meetings
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Sponsorship Hub Template
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            This page shows both sides of the sponsorship flow in one place—the club or 
            business that needs support and the sponsor who is exploring opportunities.
          </p>

          {/* View Toggle */}
          <Tabs value={activeView} onValueChange={(v) => setActiveView(v as "business" | "sponsor")} className="w-full max-w-md mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="business">
                <Target className="w-4 h-4 mr-2" />
                View as Business/Club
              </TabsTrigger>
              <TabsTrigger value="sponsor">
                <Heart className="w-4 h-4 mr-2" />
                View as Sponsor
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Business/Club View */}
          <div className={`transition-all ${activeView === "business" ? "ring-2 ring-primary rounded-lg" : ""}`}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  For clubs and businesses seeking sponsors
                </CardTitle>
                <CardDescription>
                  How your sponsorship profile appears to potential supporters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary Header */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{businessData.name}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{businessData.category}</Badge>
                      <Badge variant="outline" className="gap-1">
                        <MapPin className="w-3 h-3" />
                        {businessData.location}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Users className="w-3 h-3" />
                        {businessData.audienceSize}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Funding Goals */}
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      Funding Goals
                    </h4>
                    <span className="text-sm font-medium text-muted-foreground">
                      ${businessData.raisedSoFar.toLocaleString()} / ${businessData.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(businessData.raisedSoFar / businessData.fundingGoal) * 100} 
                    className="h-3"
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {businessData.purpose}
                  </p>
                </div>

                {/* Audience & Impact */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-info" />
                    Audience & Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {businessData.stats.map((stat, idx) => (
                      <div key={idx} className="p-3 bg-card border border-border rounded-lg">
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsor Benefits */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    Sponsor Benefits
                  </h4>
                  <div className="space-y-2">
                    {businessData.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button className="flex-1 gap-2">
                    <Share2 className="w-4 h-4" />
                    Share Sponsorship Deck
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Eye className="w-4 h-4" />
                    Preview Sponsor View
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Sponsor View */}
          <div className={`transition-all ${activeView === "sponsor" ? "ring-2 ring-primary rounded-lg" : ""}`}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent" />
                  For sponsors exploring opportunities
                </CardTitle>
                <CardDescription>
                  Discover and connect with impactful projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter Bar */}
                <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg border border-border">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="w-3 h-3" />
                    Category
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <DollarSign className="w-3 h-3" />
                    Budget Range
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <MapPin className="w-3 h-3" />
                    Location
                  </Button>
                </div>

                {/* Opportunities List */}
                <div className="space-y-3">
                  {opportunities.map((opp) => (
                    <Card 
                      key={opp.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedOpportunity === opp.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedOpportunity(opp.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h5 className="font-semibold text-foreground">{opp.name}</h5>
                            <p className="text-sm text-muted-foreground mt-1">{opp.mission}</p>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {opp.fitScore}% fit
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline">{opp.category}</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Users className="w-3 h-3" />
                            {opp.audienceSize}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <DollarSign className="w-3 h-3" />
                            {opp.requestedAmount}
                          </Badge>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full mt-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedOpportunity(opp.id);
                          }}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Detail Panel */}
                {selectedOpp && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedOpp.name}</CardTitle>
                      <CardDescription>{selectedOpp.category}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedOpp.details.story}
                      </p>

                      <div className="space-y-2">
                        <h6 className="font-semibold text-sm text-foreground">Funding Breakdown</h6>
                        {selectedOpp.details.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm p-2 bg-card rounded">
                            <span className="text-muted-foreground">{item.item}</span>
                            <span className="font-medium text-foreground">{item.amount}</span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <h6 className="font-semibold text-sm text-foreground">Benefits Include</h6>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary">Logo placement</Badge>
                          <Badge variant="secondary">Social media</Badge>
                          <Badge variant="secondary">Event booth</Badge>
                          <Badge variant="secondary">Resume access</Badge>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 gap-2">
                          <Mail className="w-4 h-4" />
                          Contact Team
                        </Button>
                        <Button variant="outline" className="flex-1 gap-2">
                          <Heart className="w-4 h-4" />
                          Shortlist
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipHub;
