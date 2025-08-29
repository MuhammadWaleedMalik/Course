import React, { useState } from 'react';
import "./TeamSlide.scss";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
  skills: string[];
  image: string;
}

const TeamShowcaseComponent: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const teamMembers: TeamMember[] = [
    {
      id: 0,
      name: "Alex Johnson",
      role: "Frontend Developer",
      department: "Engineering",
      bio: "Specializes in React and TypeScript with 5 years of experience building responsive web applications.",
      skills: ["React", "TypeScript", "CSS/SASS", "UI/UX"],
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 1,
      name: "Maria Garcia",
      role: "UX Designer",
      department: "Design",
      bio: "Passionate about creating intuitive user experiences with a focus on accessibility and mobile-first design.",
      skills: ["Figma", "User Research", "Prototyping", "Accessibility"],
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "James Wilson",
      role: "Backend Engineer",
      department: "Engineering",
      bio: "Develops scalable server architectures with expertise in Node.js and database optimization.",
      skills: ["Node.js", "SQL", "AWS", "API Design"],
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const handleMemberChange = (id: number) => {
    setSelectedMember(id);
    setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="team-showcase">
      {/* Navigation Dots */}
      <div className="team-nav-dots">
        {teamMembers.map((member) => (
          <button
            key={member.id}
            className={`dot ${selectedMember === member.id ? 'active' : ''}`}
            onClick={() => handleMemberChange(member.id)}
            aria-label={`View ${member.name}`}
          />
        ))}
      </div>

      {/* Main Team Member Display */}
      <div className="team-member-display">
        <div className="member-image-container">
          <img 
            src={teamMembers[selectedMember].image} 
            alt={teamMembers[selectedMember].name}
            className="member-image"
          />
        </div>

        <div className="member-info">
          <h2>{teamMembers[selectedMember].name}</h2>
          <h3>{teamMembers[selectedMember].role}</h3>
          <p className="department">{teamMembers[selectedMember].department}</p>

          <button 
            className="details-toggle"
            onClick={toggleDetails}
            aria-expanded={showDetails}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>

          {showDetails && (
            <div className="member-details">
              <p className="bio">{teamMembers[selectedMember].bio}</p>
              <div className="skills">
                <h4>Skills:</h4>
                <ul>
                  {teamMembers[selectedMember].skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Arrows */}
      <div className="mobile-nav">
        <button 
          className="nav-arrow prev"
          onClick={() => handleMemberChange((selectedMember - 1 + teamMembers.length) % teamMembers.length)}
          aria-label="Previous team member"
        >
          &lt;
        </button>
        <button 
          className="nav-arrow next"
          onClick={() => handleMemberChange((selectedMember + 1) % teamMembers.length)}
          aria-label="Next team member"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TeamShowcaseComponent;