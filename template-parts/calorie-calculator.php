<?php

/**
 * Ketocist Calorie Calculator Template.
 *
 * @package calorie-calculator
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
	exit;
}
?>
<div class="calorie_calculator_container">
	<div class="calorie_tab calorie_tab_1">
		<button class="tablinks active"><?php echo esc_html__('1. About You', 'calorie-calculator'); ?><span class="calorie_tab_steps d-block d-lg-none"><?php echo esc_html__('1 of 4', 'calorie-calculator'); ?></span>
			<hr />
		</button>
		<button class="tablinks"><?php echo esc_html__('2. Activity Level', 'calorie-calculator'); ?><span class="calorie_tab_steps d-block d-lg-none"><?php echo esc_html__('2 of 4', 'calorie-calculator'); ?></span>
			<hr />
		</button>
		<button class="tablinks"><?php echo esc_html__('3. Goals', 'calorie-calculator'); ?><span class="calorie_tab_steps d-block d-lg-none"><?php echo esc_html__('3 of 4', 'calorie-calculator'); ?></span>
			<hr />
		</button>
		<button class="tablinks"><?php echo esc_html__('4. Result', 'calorie-calculator'); ?><span class="calorie_tab_steps d-block d-lg-none"><?php echo esc_html__('4 of 4', 'calorie-calculator'); ?></span>
			<hr />
		</button>
	</div>

	<div id="ketoDietBuddy">
		<!-- Tab content -->
		<div id="calorie_about_you" class="calorie_tabcontent">
			<div class="row">
				<div class="col-md-6 col-12">
					<div><span class="kdbFieldName"><?php echo esc_html__('What type unit do you prefer ?', 'calorie-calculator'); ?></span><br />
						<div class="calorie_switch_container">
							<span><?php echo esc_html__('Metric', 'calorie-calculator'); ?></span>
							<label class="calorie_switch">
								<input name="units_switcher" type="checkbox">
								<span class="calorie_slider round"></span>
							</label>
							<span><?php echo esc_html__('US Customary', 'calorie-calculator'); ?></span>
						</div>
					</div><br>

					<div><span class="kdbFieldName"><?php echo esc_html__('Gender', 'calorie-calculator'); ?></span><br />
						<div class="calorie_switch_container">
							<span><?php echo esc_html__('Female', 'calorie-calculator'); ?></span>
							<label class="calorie_switch">
								<input name="gender_switcher" type="checkbox">
								<span class="calorie_slider round"></span>
							</label>
							<span><?php echo esc_html__('Male', 'calorie-calculator'); ?></span>
						</div>
					</div><br>

					<p><span class="kdbFieldName"><?php echo esc_html__('Age', 'calorie-calculator'); ?></span><br /><input type="text" name="age" value="35"><span><?php echo esc_html__('years', 'calorie-calculator'); ?></span></p>
				</div>

				<div class="col-md-6 col-12">
					<div class="calcMetric" style="display: none;">
						<p>
							<span class="kdbFieldName"><?php echo esc_html__('Weight', 'calorie-calculator'); ?></span><br />
							<input type="text" name="weightMetricKilos" value="80">
							<span><?php echo esc_html__('Kg', 'calorie-calculator'); ?></span>
						</p>
						<p>
							<span class="kdbFieldName"><?php echo esc_html__('Height', 'calorie-calculator'); ?></span><br />
							<input type="text" name="heightMetricMeters" value="1.68">
							<span><?php echo esc_html__('meters', 'calorie-calculator'); ?></span><br />
							<small><?php echo esc_html__('(e.g. 1.76 meters = 176 cm)', 'calorie-calculator'); ?></small>
						</p>
					</div>

					<div class="calcUS" style="display: none;">
						<p><span class="kdbFieldName"><?php echo esc_html__('Weight', 'calorie-calculator'); ?></span><br /><input type="text" name="weightUSPounds" value="176.4"><span><?php echo esc_html__('lbs', 'calorie-calculator'); ?></span></p>

						<p><span class="kdbFieldName"><?php echo esc_html__('Height', 'calorie-calculator'); ?></span><br /><input type="text" name="heightUSFeet" value="5"><span><?php echo esc_html__('feet', 'calorie-calculator'); ?></span>
							<input type="text" name="heightUSInches" value="6.1"><span><?php echo esc_html__('inches', 'calorie-calculator'); ?></span>
						</p>
					</div>

					<div class="calcImperial" style="display: block;">
						<p><span class="kdbFieldName"><?php echo esc_html__('Weight', 'calorie-calculator'); ?></span><br /><input type="text" name="weightImperialStones" value="12"><span><?php echo esc_html__('stones', 'calorie-calculator'); ?></span>
							<input type="text" name="weightImperialPounds" value="8.4"><span><?php echo esc_html__('lbs', 'calorie-calculator'); ?></span>
						</p>

						<p><span class="kdbFieldName"><?php echo esc_html__('Height', 'calorie-calculator'); ?></span><br /><input type="text" name="heightImperialFeet" value="5"><span><?php echo esc_html__('feet', 'calorie-calculator'); ?></span>
							<input type="text" name="heightImperialInches" value="6.1"><span><?php echo esc_html__('inches', 'calorie-calculator'); ?></span>
						</p>
					</div>
				</div>
			</div>

			<div class="calorie_calc_nav"><i></i><button class="uf-buttons calorie_button_next"><?php echo esc_html__('Next', 'calorie-calculator'); ?></button></div>
		</div>
		<!-- Tab content -->
		<div id="calorie_activity_level" class="calorie_tabcontent">
			<div>
				<span class="kdbFieldName"><?php echo esc_html__('Activity Level', 'calorie-calculator'); ?></span><br />
				<div class="activity_container">
					<div class="row">
						<div class="col-md-6 col-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Sedentary', 'calorie-calculator'); ?>
								<input type="radio" name="activity_radio" checked="checked" value="0">
								<span class="calorie_radio_checkmark"></span>
							</label>
							<div class="calorie_radio_description">
								<p><?php echo esc_html__('Not much activity with little to no exercise. Typically a desk job.', 'calorie-calculator'); ?></p>
							</div>
						</div>
						<div class="col-md-6 col-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Lightly active', 'calorie-calculator'); ?>
								<input type="radio" name="activity_radio" value="1">
								<span class="calorie_radio_checkmark"></span>
							</label>
							<div class="calorie_radio_description">
								<p><?php echo esc_html__('Daytime walking with less than 20 minutes exercise per day. Usually light strolls after meals.', 'calorie-calculator'); ?></p>
							</div>
						</div>
						<div class="col-md-6 col-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Moderately active', 'calorie-calculator'); ?>
								<input type="radio" name="activity_radio" value="2">
								<span class="calorie_radio_checkmark"></span>
							</label>
							<div class="calorie_radio_description">
								<p><?php echo esc_html__('A lightly active day job with physical labor or scheduled exercise (i.e. riding your bike to work or lifting a few times a week).', 'calorie-calculator'); ?></p>
							</div>
						</div>
						<div class="col-md-6 col-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Very active', 'calorie-calculator'); ?>
								<input type="radio" name="activity_radio" value="3">
								<span class="calorie_radio_checkmark"></span>
							</label>
							<div class="calorie_radio_description">
								<p><?php echo esc_html__('A very active day job (i.e. construction or industrial worker) or intense amount of exercise every day.', 'calorie-calculator'); ?></p>
							</div>
						</div>
						<div class="col-md-6 col-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Athlete/Bodybuilder', 'calorie-calculator'); ?>
								<input type="radio" name="activity_radio" value="4">
								<span class="calorie_radio_checkmark"></span>
							</label>
							<div class="calorie_radio_description">
								<p><?php echo esc_html__('People who do high-intensity training like Crossfit. An average person who exercises four to five times a week.', 'calorie-calculator'); ?></p>
							</div>
						</div>
					</div>
				</div>
			</div><br>
			<div class="calorie_calc_nav">
				<button class="uf-buttons-secondary calorie_button_prev"><?php echo esc_html__('Back', 'calorie-calculator'); ?></button>
				<button class="uf-buttons calorie_button_next"><?php echo esc_html__('Next', 'calorie-calculator'); ?></a></button>
			</div>
		</div>
		<!-- Tab content -->
		<div id="calorie_goal" class="calorie_tabcontent">
			<div class="row">
				<div class="col-md-6 col-12">
					<span class="kdbFieldName"><?php echo esc_html__('Body fat', 'calorie-calculator'); ?></span><br />
					<input type="text" name="bodyfat" value="25"><span><?php echo esc_html__('%', 'calorie-calculator'); ?></span><br />
					<span class="kdbFieldName"><?php echo esc_html__('Net carbs', 'calorie-calculator'); ?></span><br />
					<input type="text" name="netcarbs" value="25"><span><?php echo esc_html__('grams', 'calorie-calculator'); ?></span>
					<p><?php echo esc_html__('Specify the amount of daily net carbs you\'d like to consume. Typically, 20-30 grams is recommended to start with.', 'calorie-calculator'); ?></p>
				</div>

				<div class="col-md-6 col-12">
					<div class="row">
						<div class="col-12 calorie_goals_title">
							<span class="kdbFieldName"><?php echo esc_html__('What are your end goals of a ketogenic diet?', 'calorie-calculator'); ?></span><br />
						</div>

						<div class="col-md-4 col-sm-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Weight loss', 'calorie-calculator'); ?>
								<input type="radio" name="goal_radio" checked="checked" value="0">
								<span class="calorie_radio_checkmark"></span>
							</label>
						</div>

						<div class="col-md-4 col-sm-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Weight gain', 'calorie-calculator'); ?>
								<input type="radio" name="goal_radio" value="1">
								<span class="calorie_radio_checkmark"></span>
							</label>
						</div>

						<div class="col-md-4 col-sm-12">
							<label class="calorie_radio_container"><?php echo esc_html__('Custom', 'calorie-calculator'); ?>
								<input type="radio" name="goal_radio" value="2">
								<span class="calorie_radio_checkmark"></span>
							</label>
						</div>
					</div>

					<div id="goalCustom" style="display: none;">
						<p><?php echo esc_html__('Enter the calorie intake adjustment. For a calorie deficit (weight loss) enter a negative value (e.g. -10) while for a calorie surplus (weight gain) enter a positive value (e.g. 15).', 'calorie-calculator'); ?>
							<em><?php echo esc_html__('It is recommended that you opt for a moderate calorie deficit or surplus.', 'calorie-calculator'); ?></em>
						</p>

						<span class="kdbFieldName"><?php echo esc_html__('Calorie adjustment:', 'calorie-calculator'); ?></span><br />
						<input type="text" name="customCalorieAdjustment" value="0" style="border: 4px solid red;"><span><?php echo esc_html__('%', 'calorie-calculator'); ?></span>
					</div>
				</div>
			</div>

			<div class="calorie_calc_nav">
				<button class="uf-buttons-secondary calorie_button_prev"><?php echo esc_html__('Back', 'calorie-calculator'); ?></button>
				<button class="uf-buttons calorie_button_next"><?php echo esc_html__('Calculate Now', 'calorie-calculator'); ?></button>
			</div>
		</div>
		<!-- Tab content -->
		<div id="calorie_result" class="calorie_tabcontent">
			<div id="kdbResults">
				<h3><?php echo esc_html__('Maintenance', 'calorie-calculator'); ?></h3>
				<span class="kdbFieldName"><?php echo esc_html__('Maintenance level is the level at which your weight remains stable.', 'calorie-calculator'); ?></span>
				<div id="resultsMaintainWeight">
					<div class="kdbResultCard" id="resultsZeroDeficit">
						<div class="kdbMacroOverview">
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your BMR is:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">1536</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">2027</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">184</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">184</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1653</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">5</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">14</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">81</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div>
					<p class="kdbWarning kdbNOWEIGHTLOSSSUGGESTIONS" style="display: none;"><?php echo esc_html__('Sorry, cannot offer any weight loss suggestions. Please use the Custom section for weight loss macro targets.', 'calorie-calculator'); ?></p>
					<p class="kdbWarning kdbBODYFATTOOLOW" style="display: none;"><?php echo esc_html__('Your body fat is too low. You should have a minimum of', 'calorie-calculator'); ?> <span class="kdbEssentialFat">3</span><?php echo esc_html__('% body fat (essential fat you cannot lose).', 'calorie-calculator'); ?> <em><?php echo esc_html__('It is not advisable for you to lose any more weight.', 'calorie-calculator'); ?></em></p>
					<p class="kdbWarning kdbCARBSTOOHIGH" style="display: none;"><?php echo esc_html__('Based on the amount of net carbs you specified, it would impossible to lose any weight. Please, reduce the amount of net carbs and try again.', 'calorie-calculator'); ?></p>
				</div>

				<div id="resultsLosingWeight" style="display: block;">
					<h3><?php echo esc_html__('Goal', 'calorie-calculator'); ?></h3>
					<p><?php echo esc_html__('Below is a range of calorie deficits to help you lose weight. For best results, it is recommended that you opt for a moderate calorie deficit of 10-20%.', 'calorie-calculator'); ?></p>
					<div class="kdbResultCard" id="resultsSmallDeficit">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Small calorie deficit (11%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">1804</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">159</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">159</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1430</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">6</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">15</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">79</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kdbResultCard" id="resultsMediumDeficit">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Moderate calorie deficit (22%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">1581</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">134</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">134</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1207</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">6</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">17</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">77</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kdbResultCard" id="resultsLargeDeficit">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Large calorie deficit (33%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">1358</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">109</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">109</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">984</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">7</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">20</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">73</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="resultsGainingWeight" style="display: none;">
					<h3><?php echo esc_html__('Goal', 'calorie-calculator'); ?></h3>
					<p><?php echo esc_html__('Below is a range of calorie surpluses to help you bulk up and gain muscle size. Keep in mind that you will need to add physical activity (weight training) in order to increase your muscle mass. For best results, it is recommended that you opt for a moderate calorie surplus of 10-20%.', 'calorie-calculator'); ?></p>
					<div class="kdbResultCard" id="resultsSmallSurplus">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Calorie surplus (10%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">2231</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">206</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">206</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?>', 'calorie-calculator' ); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1856</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">4</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">12</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">84</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kdbResultCard" id="resultsMediumSurplus">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Calorie surplus (15%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">2332</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">218</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">218</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1958</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">4</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">12</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">84</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="kdbResultCard" id="resultsLargeSurplus">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle">C<?php echo esc_html__('alorie surplus (20%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">2434</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">229</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">229</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">2059</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">4</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">11</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">85</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="resultsCustom" style="display: none;">
					<h3><?php echo esc_html__('Goal', 'calorie-calculator'); ?></h3>
					<div class="kdbResultCard" id="resultsCustomContent">
						<div class="kdbMacroOverview">
							<h4 class="kdbMacroChartTitle"><?php echo esc_html__('Custom adjustment (0%)', 'calorie-calculator'); ?></h4>
							<div class="kdbMacroContent">
								<div class="kdbMacroContentLeft">
									<div class="kdbEnergyOverview">
										<table>
											<tbody>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your BMR is:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">1536</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Calories to consume:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">2028</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbAttributeName"><?php echo esc_html__('Your fat intake should be:', 'calorie-calculator'); ?></td>
													<td class="kdbAttributeValue">184</td>
													<td class="kdbAttributeUnits"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
									<div class="kdbMacroLegend">
										<table>
											<tbody>
												<tr>
													<td colspan="2" class="kdbLegendName kdbNetCarbs"><?php echo esc_html__('Net Carbs', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbProtein"><?php echo esc_html__('Protein', 'calorie-calculator'); ?></td>
													<td colspan="2" class="kdbLegendName kdbFat"><?php echo esc_html__('Fat', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">25</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">69</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">184</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('grams', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">100</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">275</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">1653</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('kcal', 'calorie-calculator'); ?></td>
												</tr>
												<tr>
													<td class="kdbLegendValue kdbNetCarbs">5</td>
													<td class="kdbLegendUnits kdbNetCarbs"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbProtein">14</td>
													<td class="kdbLegendUnits kdbProtein"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
													<td class="kdbLegendValue kdbFat">81</td>
													<td class="kdbLegendUnits kdbFat"><?php echo esc_html__('%', 'calorie-calculator'); ?></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="calorie_calc_nav">
				<button class="uf-buttons-secondary calorie_button_prev"><?php echo esc_html__('Back', 'calorie-calculator'); ?></button><i></i>
			</div>
		</div>
	</div>
</div>