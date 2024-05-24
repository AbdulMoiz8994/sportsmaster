const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User=require("./src/modals/user/index");
require("dotenv").config();

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "https://sportsmaster.onrender.com/auth/google/callback",
			scope: ["profile", "email"],
		},
	async function (accessToken, refreshToken, profile, done) {
			console.log('Profile Data')
			console.log(profile)
			try {
				// Check if user already exists in the database by email
				let existingUser = await User.findOne({ email: profile.emails[0].value });
				if (existingUser) {
				  // User already exists, return the existing user
				  return done(null, existingUser);
				} else {
				  // User does not exist, create a new user
				  let newUser = new User({
					googleId: profile.id,
					fullName: profile.displayName,
					email: profile.emails[0].value,
				  });
		
				  // Save the new user to the database
				  await newUser.save();
				  return done(null, newUser);
				}
			  } catch (err) {
				console.error(err);
				return done(err, null);
			  }
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
