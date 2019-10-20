const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../components/users/userModel")

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id)
});

passport.use(
  new GoogleStrategy(
    {
      clientID: "325195342416-todnri7jn5fgl3das4bmgtd5oc4di169.apps.googleusercontent.com",
      clientSecret: "lGdUj0gltt0j0qnNT_V4FvnZ",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (token, tokenSecret, profile, done) => {
      console.log(token, tokenSecret, profile);
      const email = profile.emails[0].value;
      const user = await User.findOne({
        where: { email }
      })
      if (!user) {
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;
        const avatar = profile.photos[0].value;
        const createdUser = await User.create({
          firstName,
          lastName,
          avatar,
          email
        })
        done(null, createdUser);
      } else {
        done(null, user);
      }
    },
  ),
);
