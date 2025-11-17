import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { compatibilityScore } from "@/lib/matchingAlgorithm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  MapPin, 
  Users, 
  DollarSign,
  TrendingUp,
  CheckCircle2,
  Mail,
  Heart,
  Filter,
  ChevronRight,
  Sparkles,
  Target,
  Award
} from "lucide-react";

const SponsorshipHub = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<"business" | "sponsor">("business");
  const [selectedOpportunity, setSelectedOpportunity] = useState<number | null>(null);
  const [opportunities, setOpportunities] = useState<any[]>([]);

  const businessData = {
    name: "ASU Circle Innovators",
    tag: "Student hackathon team",
    location: "Tempe, AZ",
    audienceSize: "500+ students",
    mission: "Run hands-on AI showcase events that connect students, mentors, and local sponsors.",
    fundingGoal: 5000,
    raisedSoFar: 2800,
    purpose: "Cover venue costs, prizes, and travel scholarships for underrepresented students participating in our annual Campus AI Showcase.",
    stats: [
      { label: "Participants", value: "500+", sublabel: "per event" },
      { label: "Social Reach", value: "2.3K", sublabel: "followers" },
      { label: "Sponsor ROI", value: "95%", sublabel: "satisfaction" }
    ],
    benefits: [
      "Logo on event materials",
      "Presence at the event",
      "Talent pipeline introductions",
      "Impact story after the event"
    ]
  };

  // Load business profiles from localStorage and calculate fit scores
  useEffect(() => {
    const storedBusinessProfile = localStorage.getItem('businessProfile');
    const storedSponsorProfile = localStorage.getItem('sponsorProfile');
    
    const businesses = storedBusinessProfile ? [JSON.parse(storedBusinessProfile)] : [];
    
    // Add sample opportunities if no business profiles exist
    if (businesses.length === 0) {
      businesses.push(
        {
          organizationName: "ASU Circle Innovators",
          category: "Student Event",
          mission: "Hands-on AI fair connecting students and local tech sponsors.",
          targetAudience: ["students", "tech professionals", "AI enthusiasts"],
          minBudget: 4000,
          maxBudget: 6000,
          location: { lat: 33.4242, lng: -111.9281 },
          purpose: "We're a student-led organization passionate about making AI education accessible."
        },
        {
          organizationName: "Tech Community Collective",
          category: "Club Partnership",
          mission: "Weekly networking nights for students and tech professionals.",
          targetAudience: ["tech professionals", "students", "entrepreneurs"],
          minBudget: 2500,
          maxBudget: 4500,
          location: { lat: 33.4484, lng: -112.0740 },
          purpose: "Building bridges between students and industry."
        },
        {
          organizationName: "First Year Builders Club",
          category: "Community Meetup",
          mission: "Mini-hackathon series for first-year engineering students.",
          targetAudience: ["students", "beginners", "developers"],
          minBudget: 2000,
          maxBudget: 3000,
          location: { lat: 33.4242, lng: -111.9281 },
          purpose: "Empowering first-year students to build confidence."
        }
      );
    }

    // Calculate fit scores
    const processedOpportunities = businesses.map((business, idx) => {
      let fitScore = 75; // default
      
      if (storedSponsorProfile) {
        const sponsor = JSON.parse(storedSponsorProfile);
        const sponsorData = {
          targetAudience: (sponsor.targetAudience || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          preferredCategories: (sponsor.interests || '').split(',').map((s: string) => s.trim()).filter(Boolean),
          location: sponsor.location || { lat: 33.4484, lng: -112.0740 },
          geographicRadius: 100,
          minBudget: Number(sponsor.minBudget) || 0,
          maxBudget: Number(sponsor.maxBudget) || 10000
        };
        
        const businessData = {
          targetAudience: business.targetAudience || [],
          category: business.category,
          location: business.location,
          minBudget: Number(business.minBudget) || 0,
          maxBudget: Number(business.maxBudget) || 5000
        };
        
        fitScore = Math.round(compatibilityScore(sponsorData, businessData));
      }

      const avgBudget = (Number(business.minBudget) || 0 + Number(business.maxBudget) || 5000) / 2;
      
      return {
        id: idx + 1,
        name: business.organizationName || "Unnamed Organization",
        category: business.category || "Event",
        mission: business.mission || "No mission statement provided",
        audienceSize: "200+",
        requestedAmount: `$${business.minBudget?.toLocaleString() || 0} - $${business.maxBudget?.toLocaleString() || 5000}`,
        fitScore: fitScore,
        story: business.purpose || business.mission || "Building community connections.",
        breakdown: [
          { item: "Venue & Equipment", amount: `$${Math.round(avgBudget * 0.4).toLocaleString()}` },
          { item: "Scholarships/Support", amount: `$${Math.round(avgBudget * 0.3).toLocaleString()}` },
          { item: "Prizes & Materials", amount: `$${Math.round(avgBudget * 0.3).toLocaleString()}` }
        ]
      };
    });

    setOpportunities(processedOpportunities);
  }, []);

  const selectedOpp = opportunities.find(o => o.id === selectedOpportunity);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background decorative circle */}
      <div className="fixed top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 blur-3xl opacity-30 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-secondary/15 via-primary/10 to-accent/15 blur-3xl opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <span className="text-xl font-bold text-foreground">circle</span>
            </div>
          </div>
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <Badge className="mb-2 bg-primary/20 text-primary border-primary/30 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            Circle for Sponsors
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-3 tracking-tight">
            Sponsorship Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Match student events and clubs with sponsors who care about impact.
          </p>
          <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto pt-2">
            This is a demo view for partner meetings showing both business and sponsor perspectives.
          </p>
        </div>

        {/* View Switch */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex glass-card rounded-full p-1.5 gap-1">
            <button
              onClick={() => setActiveView("business")}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2
                ${activeView === "business" 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Target className="w-4 h-4" />
              View as Business/Club
            </button>
            <button
              onClick={() => setActiveView("sponsor")}
              className={`
                px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2
                ${activeView === "sponsor" 
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/50" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <Heart className="w-4 h-4" />
              View as Sponsor
            </button>
          </div>
        </div>

        {/* Main Card Container */}
        <div className={`
          max-w-5xl mx-auto glass-card rounded-3xl p-8 transition-all duration-500
          ${activeView === "business" ? "ring-2 ring-primary/50" : "ring-2 ring-secondary/50"}
        `}>
          {/* Business/Club View */}
          {activeView === "business" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  For clubs and businesses seeking sponsors
                </h2>
                <p className="text-muted-foreground">How your Circle profile appears to potential supporters</p>
              </div>

              {/* Profile Summary */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-3">{businessData.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">{businessData.tag}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <MapPin className="w-3 h-3" />
                      {businessData.location}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Users className="w-3 h-3" />
                      {businessData.audienceSize}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{businessData.mission}</p>
                </div>
              </div>

              {/* Funding Goals */}
              <div className="glass-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-success" />
                    Funding Goals & Impact
                  </h4>
                  <span className="text-sm font-medium text-foreground">
                    ${businessData.raisedSoFar.toLocaleString()} / ${businessData.fundingGoal.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(businessData.raisedSoFar / businessData.fundingGoal) * 100} 
                  className="h-3 bg-muted"
                />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {businessData.purpose}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                {businessData.stats.map((stat, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-5 text-center space-y-1">
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-foreground">{stat.label}</p>
                    <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
                  </div>
                ))}
              </div>

              {/* Sponsor Benefits */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  Sponsor Benefits & Actions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {businessData.benefits.map((benefit, idx) => (
                    <Badge key={idx} variant="secondary" className="text-sm px-3 py-1.5">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={() => navigate("/business")}
                  className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/30"
                >
                  Create Your Profile
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" className="flex-1 gap-2 border-primary/30 hover:bg-primary/10">
                  Preview how sponsors see this
                </Button>
              </div>
            </div>
          )}

          {/* Sponsor View */}
          {activeView === "sponsor" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-accent" />
                  For sponsors exploring opportunities
                </h2>
                <p className="text-muted-foreground">Discover student events that match your brand and hiring goals</p>
              </div>

              {/* CTA and Filter Bar */}
              <div className="space-y-4">
                <Button 
                  onClick={() => navigate("/sponsor")}
                  className="w-full gap-2 bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white shadow-lg shadow-secondary/30"
                >
                  Create Your Sponsor Profile
                  <ChevronRight className="w-4 h-4" />
                </Button>
                
                <div className="flex flex-wrap gap-2 glass-card rounded-xl p-4">
                  <Button variant="outline" size="sm" className="gap-2 border-border/50">
                    <Filter className="w-3 h-3" />
                    Category
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 border-border/50">
                    <DollarSign className="w-3 h-3" />
                    Budget Range
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 border-border/50">
                    <MapPin className="w-3 h-3" />
                    Location
                  </Button>
                </div>
              </div>

              {/* Opportunities List */}
              <div className="space-y-4">
                {opportunities.map((opp) => (
                  <Card 
                    key={opp.id}
                    className={`
                      cursor-pointer transition-all duration-300 border-border/50
                      hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30
                      ${selectedOpportunity === opp.id ? "ring-2 ring-secondary shadow-lg shadow-secondary/20" : ""}
                    `}
                    onClick={() => setSelectedOpportunity(selectedOpportunity === opp.id ? null : opp.id)}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-bold text-lg text-foreground mb-1">{opp.name}</h5>
                          <p className="text-sm text-muted-foreground">{opp.mission}</p>
                        </div>
                        <Badge className="ml-3 bg-success/20 text-success border-success/30 font-semibold">
                          {opp.fitScore}% fit
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
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
                      {selectedOpportunity !== opp.id && (
                        <Button 
                          size="sm" 
                          className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90 text-white"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Detail Panel */}
              {selectedOpp && (
                <Card className="glass-card border-secondary/30 animate-in slide-in-from-bottom duration-500">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {selectedOpp.name}
                      <Badge variant="secondary">{selectedOpp.category}</Badge>
                    </CardTitle>
                    <CardDescription className="text-base">{selectedOpp.mission}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <h6 className="font-semibold text-sm text-foreground mb-2">Their Story</h6>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedOpp.story}
                      </p>
                    </div>

                    <div>
                      <h6 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-info" />
                        Funding Breakdown
                      </h6>
                      <div className="space-y-2">
                        {selectedOpp.breakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm p-3 bg-muted/30 rounded-lg border border-border/30">
                            <span className="text-muted-foreground">{item.item}</span>
                            <span className="font-semibold text-foreground">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h6 className="font-semibold text-sm text-foreground mb-3">Benefits Include</h6>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">Logo placement</Badge>
                        <Badge variant="secondary">Social media</Badge>
                        <Badge variant="secondary">Event booth</Badge>
                        <Badge variant="secondary">Resume access</Badge>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button className="flex-1 gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white shadow-lg shadow-primary/30">
                        <Mail className="w-4 h-4" />
                        Contact Team
                      </Button>
                      <Button variant="outline" className="flex-1 gap-2 border-accent/30 hover:bg-accent/10">
                        <Heart className="w-4 h-4" />
                        Shortlist
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SponsorshipHub;
